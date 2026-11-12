import { router, json, requireAuth, db, ai } from '@appdeploy/sdk';
import { realtimeSubscriptionRoutes } from './realtime-subscribers';

type ProgressRecord = { completed: number[]; xp: number; updatedAt: string };

async function saveProgress(userId: string, completed: number[], xp: number) {
  const updatedAt = new Date().toISOString();
  const [existing] = await db.get<ProgressRecord>('user_progress', [userId]);
  if (existing) {
    const [ok] = await db.tx.update('user_progress', [{ id: userId, record: { completed, xp, updatedAt } }], { patch: true });
    if (!ok) throw new Error('Progress update failed');
    return { completed, xp, updatedAt };
  }
  const [id] = await db.tx.add('user_progress', [{ id: userId, completed, xp, updatedAt }]);
  if (id) return { completed, xp, updatedAt };
  const [current] = await db.get<ProgressRecord>('user_progress', [userId], { consistent: true });
  if (!current) throw new Error('Progress save failed');
  const [ok] = await db.tx.update('user_progress', [{ id: userId, record: { completed, xp, updatedAt } }], { patch: true });
  if (!ok) throw new Error('Progress update failed');
  return { completed, xp, updatedAt };
}

export const handler = router({
  'GET /api/_healthcheck': [async () => json({ message: 'Success' })],
  'GET /api/progress': [requireAuth(), async ({ user }) => {
    const [saved] = await db.get<ProgressRecord>('user_progress', [user!.userId]);
    return json(saved || { completed: [], xp: 0, updatedAt: null });
  }],
  'POST /api/progress': [requireAuth(), async ({ user, body }) => {
    if (!body || typeof body !== 'object') return json({ error: 'Invalid progress payload' }, 400);
    const payload = body as { completed?: unknown; xp?: unknown };
    if (!Array.isArray(payload.completed) || payload.completed.length > 1000 ||
        !payload.completed.every(v => Number.isSafeInteger(v) && v > 0 && v <= 1000000) ||
        typeof payload.xp !== 'number' || !Number.isSafeInteger(payload.xp) || payload.xp < 0 || payload.xp > 100000000) {
      return json({ error: 'Progress values are invalid' }, 400);
    }
    return json({ ok: true, progress: await saveProgress(user!.userId, payload.completed as number[], payload.xp) });
  }],
  'POST /api/tutor': [requireAuth(), async ({ body }) => {
    if (!body || typeof body !== 'object') return json({ error: 'Invalid tutor request' }, 400);
    const p = body as { language?: unknown; question?: unknown; code?: unknown };
    if (!['HTML','CSS','JavaScript','Python'].includes(String(p.language)) ||
        typeof p.question !== 'string' || p.question.length > 3000 ||
        typeof p.code !== 'string' || p.code.length > 12000) {
      return json({ error: 'Use a supported language, a short question and code under 12,000 characters.' }, 400);
    }
    const result = await ai.generate({
      system: 'You are the Learn to Code tutor by Lilma Studios. Teach beginners clearly. Explain concepts and errors step by step. Never claim code was executed unless results are supplied. Keep answers focused and under 350 words.',
      prompt: 'Language: ' + p.language + '\nQuestion: ' + p.question + '\nCode:\n' + p.code,
      maxTokens: 600,
      temperature: 0.4
    });
    return json({ answer: result.text });
  }],
  ...realtimeSubscriptionRoutes,
});
