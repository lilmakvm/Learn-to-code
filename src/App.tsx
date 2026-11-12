import { useEffect, useMemo, useState } from 'react';
import { auth, api } from '@appdeploy/client';
import {
  BookOpen,
  Code2,
  Trophy,
  Flame,
  Search,
  Play,
  Check,
  Lock,
  ChevronRight,
  Terminal,
  Zap,
  Target,
  Menu,
  X,
  Home,
  User,
  Settings,
  CircleHelp,
  ArrowLeft,
  RotateCcw,
  Copy,
  CheckCircle2,
  Clock3,
  Star,
  Sparkles,
  Sun,
  Moon,
  Type,
  Info,
} from 'lucide-react';

type Lesson = {
  id: number;
  title: string;
  level: string;
  minutes: number;
  xp: number;
  topic: string;
  description: string;
  task: string;
  starter: string;
  answer: string;
  hint: string;
};
const courses = [
  {
    id: 'html',
    name: 'HTML',
    label: 'Build the structure of websites',
    color: '#f97316',
    icon: '🌐',
    lessons: 12,
    level: 'Beginner',
  },
  {
    id: 'css',
    name: 'CSS',
    label: 'Style beautiful web pages',
    color: '#38bdf8',
    icon: '🎨',
    lessons: 10,
    level: 'Beginner',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    label: 'Make websites interactive',
    color: '#eab308',
    icon: '⚡',
    lessons: 15,
    level: 'Beginner',
  },
  {
    id: 'python',
    name: 'Python',
    label: 'Learn programming step by step',
    color: '#a78bfa',
    icon: '🐍',
    lessons: 14,
    level: 'Beginner',
  },
];
const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Your first HTML page',
    level: 'Beginner',
    minutes: 5,
    xp: 30,
    topic: 'HTML',
    description:
      'HTML gives every webpage its structure. You use tags to tell the browser what each piece of content is.',
    task: 'Create a heading that says Hello, world!',
    starter: '<h1>Type your heading here</h1>',
    answer: '<h1>Hello, world!</h1>',
    hint: 'Use an opening <h1> tag and a closing </h1> tag.',
  },
  {
    id: 2,
    title: 'Paragraphs and text',
    level: 'Beginner',
    minutes: 4,
    xp: 30,
    topic: 'HTML',
    description:
      'The paragraph tag groups sentences into readable blocks of text.',
    task: 'Write a paragraph that says I am learning to code.',
    starter: '<p>Write something here</p>',
    answer: '<p>I am learning to code.</p>',
    hint: 'Wrap your sentence in <p> and </p>.',
  },
  {
    id: 3,
    title: 'Links that connect',
    level: 'Beginner',
    minutes: 6,
    xp: 40,
    topic: 'HTML',
    description:
      'Links connect pages. The href attribute tells the browser where a link should go.',
    task: 'Create a link to https://example.com with the text Visit website.',
    starter: '<a href="">Your link</a>',
    answer: '<a href="https://example.com">Visit website</a>',
    hint: 'Put the URL inside href and the clickable words between the tags.',
  },
  {
    id: 4,
    title: 'Meet CSS',
    level: 'Beginner',
    minutes: 5,
    xp: 30,
    topic: 'CSS',
    description:
      'CSS controls how a page looks: colours, spacing, typography and layout.',
    task: 'Make all h1 headings purple.',
    starter: 'h1 {\n  color: ;\n}',
    answer: 'h1 {\n  color: purple;\n}',
    hint: 'Set the color property to purple.',
  },
  {
    id: 5,
    title: 'Your first variable',
    level: 'Beginner',
    minutes: 5,
    xp: 40,
    topic: 'JavaScript',
    description:
      'Variables store information that your program can use later. Use const when the value will not be reassigned.',
    task: 'Create a constant called name with the value Lilma.',
    starter: 'const name = ;',
    answer: "const name = 'Lilma';",
    hint: 'Put Lilma inside quotes and finish the statement with a semicolon.',
  },
  {
    id: 6,
    title: 'Print a message',
    level: 'Beginner',
    minutes: 4,
    xp: 30,
    topic: 'Python',
    description:
      'The print() function displays information in the output area.',
    task: 'Use print() to display Learn to Code.',
    starter: 'print()',
    answer: "print('Learn to Code')",
    hint: 'Put the words inside quotation marks within print().',
  },
  {
    id: 7,
    title: 'Add an image',
    level: 'Beginner',
    minutes: 5,
    xp: 35,
    topic: 'HTML',
    description: 'The img element places an image on a page. Its src points to the image and alt describes it.',
    task: 'Create an image element with the source photo.jpg and alt text A mountain.',
    starter: '<img src="" alt="">',
    answer: '<img src="photo.jpg" alt="A mountain">',
    hint: 'Add photo.jpg to src and A mountain to alt.',
  },
  {
    id: 8,
    title: 'Create a CSS class',
    level: 'Beginner',
    minutes: 5,
    xp: 35,
    topic: 'CSS',
    description: 'A class lets you apply the same styles to any elements that share its name.',
    task: 'Create a .card class with 16px of padding.',
    starter: '.card {\n  padding: ;\n}',
    answer: '.card {\n  padding: 16px;\n}',
    hint: 'Set the padding property to 16px.',
  },
  {
    id: 9,
    title: 'Use CSS flexbox',
    level: 'Beginner',
    minutes: 6,
    xp: 40,
    topic: 'CSS',
    description: 'Flexbox makes it easier to arrange items in rows or columns and control their alignment.',
    task: 'Make a container use flexbox.',
    starter: '.container {\n  display: ;\n}',
    answer: '.container {\n  display: flex;\n}',
    hint: 'Set display to flex.',
  },
  {
    id: 10,
    title: 'Write a JavaScript function',
    level: 'Beginner',
    minutes: 6,
    xp: 40,
    topic: 'JavaScript',
    description: 'Functions group reusable instructions. You can call a function whenever you need those instructions.',
    task: 'Create a function named greet with an empty body.',
    starter: 'function greet() {\n  \n}',
    answer: 'function greet() {}',
    hint: 'Use the function keyword, the name greet, parentheses and braces.',
  },
  {
    id: 11,
    title: 'Work with arrays',
    level: 'Beginner',
    minutes: 6,
    xp: 45,
    topic: 'JavaScript',
    description: 'An array stores multiple values in one ordered collection.',
    task: 'Create a constant called games containing eFootball and Minecraft.',
    starter: 'const games = [];',
    answer: "const games = ['eFootball', 'Minecraft'];",
    hint: 'Put both game names in quotes inside the square brackets.',
  },
  {
    id: 12,
    title: 'Store data in Python variables',
    level: 'Beginner',
    minutes: 5,
    xp: 35,
    topic: 'Python',
    description: 'A variable gives a value a name so your program can use it later.',
    task: 'Create a variable called score and set it to 100.',
    starter: 'score = ',
    answer: 'score = 100',
    hint: 'Assign the number 100 using the equals sign.',
  },
  {
    id: 13,
    title: 'Make a decision with Python',
    level: 'Beginner',
    minutes: 6,
    xp: 40,
    topic: 'Python',
    description: 'An if statement runs code only when its condition is true.',
    task: 'Write an if statement that checks whether score is greater than 10.',
    starter: 'if score > :\n    print("Great")',
    answer: 'if score > 10:\n    print("Great")',
    hint: 'Place 10 after the greater-than sign and keep the colon.',
  },
  {
    id: 14,
    title: 'Build a simple HTML list',
    level: 'Beginner',
    minutes: 5,
    xp: 35,
    topic: 'HTML',
    description: 'Unordered lists use ul for the list and li for each item.',
    task: 'Create an unordered list with one item named Coding.',
    starter: '<ul>\n  <li></li>\n</ul>',
    answer: '<ul>\n  <li>Coding</li>\n</ul>',
    hint: 'Put Coding between the opening and closing li tags.',
  },
  {
    id: 15,
    title: 'Format text: bold, italic and underline',
    level: 'Beginner',
    minutes: 8,
    xp: 50,
    topic: 'HTML',
    description: 'HTML has elements that give text meaning and visual formatting. Learn the opening tag, content and closing tag before using them.',
    task: 'Use a b element to make the words Learn HTML bold.',
    starter: '<b>Type your words here</b>',
    answer: '<b>Learn HTML</b>',
    hint: 'Keep the words between the opening <b> and closing </b> tags.',
  },
];
const lessonGuides: Record<number, { intro: string; parts: { token: string; meaning: string }[]; example: string; walkthrough: string[]; note?: string }> = {
  1: {
    intro: 'HTML stands for HyperText Markup Language. It is the language used to describe the structure and meaning of webpage content. The browser reads HTML and turns its elements into the page you see.',
    parts: [
      { token: '<', meaning: 'Starts an HTML tag.' },
      { token: 'h1', meaning: 'The heading-one element. It represents the main, most important heading on this page.' },
      { token: '>', meaning: 'Ends the opening tag. The content starts after this character.' },
      { token: 'Hello, world!', meaning: 'The text content that the browser should display as the heading.' },
      { token: '</h1>', meaning: 'The closing tag. The slash / tells the browser this element is ending.' },
    ],
    example: '<h1>Hello, world!</h1>',
    walkthrough: ['The browser sees <h1> and starts a level-one heading.', 'It displays Hello, world! as the heading text.', 'It sees </h1> and knows the heading has ended.'],
    note: 'Most HTML elements have an opening tag, content and a closing tag. Some elements, such as img, are void elements and do not have a closing tag.'
  },
  2: {
    intro: 'A paragraph is a block of related text. HTML uses the p element to tell the browser that a group of words belongs together as a paragraph.',
    parts: [
      { token: '<p>', meaning: 'Opening paragraph tag. It tells the browser a paragraph begins.' },
      { token: 'I am learning to code.', meaning: 'The paragraph content; these are the words the visitor reads.' },
      { token: '</p>', meaning: 'Closing paragraph tag. It marks the end of this paragraph.' },
    ],
    example: '<p>I am learning to code.</p>',
    walkthrough: ['Write the opening <p> tag.', 'Put the sentence after the opening tag.', 'Finish with </p> so the browser knows where the paragraph ends.'],
  },
  3: {
    intro: 'A link, also called an anchor, lets a visitor move to another page or location. The a element creates the link. The href attribute stores its destination.',
    parts: [
      { token: '<a', meaning: 'Begins an anchor element. The a stands for anchor.' },
      { token: 'href=', meaning: 'An attribute that tells the browser where the link should lead.' },
      { token: '"https://example.com"', meaning: 'The attribute value. Quotes surround the URL because it is text.' },
      { token: 'Visit website', meaning: 'The clickable words shown to the visitor.' },
      { token: '</a>', meaning: 'Closes the anchor element.' },
    ],
    example: '<a href="https://example.com">Visit website</a>',
    walkthrough: ['The browser reads href and stores the destination URL.', 'It displays Visit website as the link label.', 'When clicked, the browser navigates to the URL.'],
    note: 'Attributes go inside the opening tag. The attribute name is href and its value is the URL inside quotes.'
  },
  4: {
    intro: 'CSS means Cascading Style Sheets. It controls presentation: colours, fonts, spacing, borders and page layout. A CSS rule has a selector and a declaration block.',
    parts: [
      { token: 'h1', meaning: 'Selector. It chooses every h1 heading on the page.' },
      { token: '{ }', meaning: 'Curly braces contain the styles that should apply to the selected elements.' },
      { token: 'color', meaning: 'Property. It identifies which visual feature to change: the text colour.' },
      { token: ':', meaning: 'Separates the property name from its value.' },
      { token: 'purple', meaning: 'Value. It tells the browser which colour to use.' },
      { token: ';', meaning: 'Ends this declaration.' },
    ],
    example: 'h1 {\n  color: purple;\n}',
    walkthrough: ['Select all h1 headings.', 'Open the declaration block with {.', 'Set the color property to the value purple.', 'End the declaration with ; and close the block with }.'],
  },
  5: {
    intro: 'A variable is a named place to keep a value so a program can use it later. In JavaScript, const creates a variable that cannot be reassigned to a different value.',
    parts: [
      { token: 'const', meaning: 'Keyword that declares a variable whose binding cannot be reassigned.' },
      { token: 'name', meaning: 'The variable name. You choose a meaningful name to identify the stored value.' },
      { token: '=', meaning: 'Assignment operator. It puts the value on the right into the variable on the left.' },
      { token: "'Lilma'", meaning: 'A string value. Quotes show that Lilma is text, not a variable name.' },
      { token: ';', meaning: 'Statement terminator commonly used at the end of JavaScript statements.' },
    ],
    example: "const name = 'Lilma';",
    walkthrough: ['const tells JavaScript a variable is being declared.', 'name is the label used to access the value.', 'The equals sign assigns the text Lilma to name.', 'The semicolon marks the end of the statement.'],
    note: 'Text is called a string. Strings are written inside single quotes, double quotes or backticks.'
  },
  6: {
    intro: 'Python is a programming language. print() is a built-in function that sends information to the output area so you can see it.',
    parts: [
      { token: 'print', meaning: 'The name of Python’s built-in display function.' },
      { token: '( )', meaning: 'Parentheses hold the information you are giving to the function.' },
      { token: "'Learn to Code'", meaning: 'A string: text surrounded by quotation marks.' },
    ],
    example: "print('Learn to Code')",
    walkthrough: ['Python finds the print function.', 'It evaluates the text inside the parentheses.', 'It displays Learn to Code in the output.'],
    note: 'The quotation marks are not printed. They tell Python where the text value begins and ends.'
  },
  7: {
    intro: 'The img element places an image in a webpage. It is a void element, which means it does not wrap content and has no closing tag.',
    parts: [
      { token: '<img', meaning: 'Starts an image element.' },
      { token: 'src=', meaning: 'The source attribute tells the browser which image file to load.' },
      { token: '"photo.jpg"', meaning: 'The image file path, written as a text value in quotes.' },
      { token: 'alt=', meaning: 'Alternative text. It describes the image for screen readers and when the image cannot load.' },
      { token: '"A mountain"', meaning: 'The description supplied for this image.' },
      { token: '>', meaning: 'Ends the image tag. There is no </img> closing tag.' },
    ],
    example: '<img src="photo.jpg" alt="A mountain">',
    walkthrough: ['The browser reads the image element.', 'It uses src to find photo.jpg.', 'It uses alt as a text description of the image.'],
  },
  8: {
    intro: 'A CSS class is a reusable label. Add the class to HTML elements, then use a dot followed by its name in CSS to style every element with that class.',
    parts: [
      { token: '.card', meaning: 'A class selector. The dot means CSS is selecting a class named card.' },
      { token: '{ }', meaning: 'The braces contain the declarations for this class.' },
      { token: 'padding', meaning: 'The property that controls space inside an element, between its content and its border.' },
      { token: '16px', meaning: 'The value: sixteen CSS pixels of inner spacing.' },
      { token: ';', meaning: 'Ends the declaration.' },
    ],
    example: '.card {\n  padding: 16px;\n}',
    walkthrough: ['The dot selects the class named card.', 'padding controls the space inside the card.', '16px sets that space to sixteen CSS pixels.'],
  },
  9: {
    intro: 'Flexbox is a CSS layout system. You turn it on for a container, then arrange its direct children along a row or column.',
    parts: [
      { token: '.container', meaning: 'Selects the HTML element whose class is container.' },
      { token: 'display', meaning: 'A CSS property that controls how an element participates in layout.' },
      { token: 'flex', meaning: 'Makes this element a flex container, arranging its children using Flexbox.' },
      { token: ';', meaning: 'Ends the CSS declaration.' },
    ],
    example: '.container {\n  display: flex;\n}',
    walkthrough: ['Select the container class.', 'Set its display property.', 'The flex value activates Flexbox for its child elements.'],
  },
  10: {
    intro: 'A function is a named group of instructions. You define it once and call it whenever you want those instructions to run.',
    parts: [
      { token: 'function', meaning: 'JavaScript keyword used to declare a function.' },
      { token: 'greet', meaning: 'The function name. You use this name when calling it.' },
      { token: '( )', meaning: 'Parentheses hold parameters: optional input values the function can receive.' },
      { token: '{ }', meaning: 'The function body. Instructions placed here run when the function is called.' },
    ],
    example: 'function greet() {\n  console.log("Hello!");\n}\n\ngreet();',
    walkthrough: ['function declares a new function.', 'greet is the name of the function.', 'The empty parentheses mean it currently accepts no inputs.', 'The braces contain its instructions.', 'greet() calls the function and runs those instructions.'],
  },
  11: {
    intro: 'An array stores several values in one ordered collection. Each item has a position called an index. JavaScript array indexes start at zero.',
    parts: [
      { token: 'const', meaning: 'Declares the variable that will hold the array.' },
      { token: 'games', meaning: 'The chosen variable name.' },
      { token: '=', meaning: 'Assigns the array to the variable.' },
      { token: '[ ]', meaning: 'Square brackets create an array and surround its items.' },
      { token: "'eFootball'", meaning: 'The first text item in the array.' },
      { token: ',', meaning: 'Separates one array item from the next.' },
      { token: "'Minecraft'", meaning: 'The second text item in the array.' },
    ],
    example: "const games = ['eFootball', 'Minecraft'];",
    walkthrough: ['Create a constant named games.', 'Open an array with [.', 'Add the first string, then a comma.', 'Add the second string and close the array with ].'],
  },
  12: {
    intro: 'A Python variable is a name connected to a value. You can use that name later instead of writing the value again.',
    parts: [
      { token: 'score', meaning: 'The variable name. It identifies the value you are storing.' },
      { token: '=', meaning: 'The assignment operator. It assigns the value on the right to the name on the left.' },
      { token: '100', meaning: 'An integer: a whole-number value. It does not need quotation marks.' },
    ],
    example: 'score = 100\nprint(score)',
    walkthrough: ['Python creates the name score.', 'It assigns the integer 100 to score.', 'print(score) displays the stored value.'],
    note: 'Numbers and text are different data types. 100 is a number; "100" is text.'
  },
  13: {
    intro: 'A condition lets a program make a decision. An if statement checks whether an expression is true and only runs its indented block when it is.',
    parts: [
      { token: 'if', meaning: 'Keyword that starts a conditional statement.' },
      { token: 'score', meaning: 'The value or variable being checked.' },
      { token: '>', meaning: 'Greater-than comparison operator. It asks whether the left value is larger than the right value.' },
      { token: '10', meaning: 'The number being compared with score.' },
      { token: ':', meaning: 'The colon marks the beginning of the indented block.' },
      { token: 'print("Great")', meaning: 'The instruction that runs if the condition is true.' },
    ],
    example: 'score = 100\nif score > 10:\n    print("Great")',
    walkthrough: ['Python checks whether score is greater than 10.', 'If the comparison is true, it enters the indented block.', 'It runs print("Great"). If false, it skips that block.'],
    note: 'Indentation matters in Python. The spaces before print show that it belongs inside the if block.'
  },
  14: {
    intro: 'A list groups related items. An unordered HTML list uses ul for the whole list and li for each individual list item.',
    parts: [
      { token: '<ul>', meaning: 'Opens an unordered list. Browsers normally show bullet points for its items.' },
      { token: '<li>', meaning: 'Opens one list item.' },
      { token: 'Coding', meaning: 'The text that belongs to this list item.' },
      { token: '</li>', meaning: 'Closes the list item.' },
      { token: '</ul>', meaning: 'Closes the entire unordered list.' },
    ],
    example: '<ul>\n  <li>Coding</li>\n</ul>',
    walkthrough: ['Open the list with <ul>.', 'Create an item with <li>.', 'Write Coding inside the item.', 'Close the item, then close the list.'],
  },
  15: {
    intro: 'Text-formatting elements change how text is presented or understood. These tags wrap around the exact words you want to format. The opening tag comes first and the closing tag uses a slash.',
    parts: [
      { token: '<b>', meaning: 'Opens a bold-style element. It makes the text visually bold, but does not by itself say the text is more important.' },
      { token: 'Learn HTML', meaning: 'The content being formatted. Put your own words between the opening and closing tags.' },
      { token: '</b>', meaning: 'Closes the bold element. The forward slash / means this is the closing tag.' },
      { token: '<strong>Important</strong>', meaning: 'Strong importance. Browsers usually show it bold, and assistive technology can treat it as important.' },
      { token: '<i>Words</i>', meaning: 'Marks text in an alternate voice or mood; browsers usually display it in italics.' },
      { token: '<em>Emphasis</em>', meaning: 'Adds stress emphasis to words; browsers usually display it in italics.' },
      { token: '<u>Underlined</u>', meaning: 'Marks text with a non-textual annotation; browsers usually underline it.' },
    ],
    example: '<b>Bold words</b>\n<strong>Important words</strong>\n<i>Alternate voice</i>\n<em>Stressed words</em>\n<u>Annotated words</u>',
    walkthrough: ['Choose the element that matches your meaning.', 'Place its opening tag before the words.', 'Write the words you want to format.', 'Place the matching closing tag after the words.', 'Only the content inside the pair is affected.'],
    note: 'Use <strong> when the words are important, and <em> when you want to stress them. Use <b> and <i> when you need attention or an alternate voice without adding importance or emphasis.'
  },
};
const starterCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; padding: 24px; color: #202033; }
    h1 { color: #7c5cff; }
  </style>
</head>
<body>
  <h1>Hello, coder!</h1>
  <p>Your coding journey starts here.</p>
</body>
</html>`;
function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('ltc_theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('ltc_font_size') || 'normal');
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('ltc_reduce_motion') === 'true');
  const [showSplash, setShowSplash] = useState(true);
  const [activeCourse, setActiveCourse] = useState('html');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('ltc_completed') || '[]')
  );
  const [xp, setXp] = useState(() =>
    Number(localStorage.getItem('ltc_xp') || 0)
  );
  const [streak, setStreak] = useState(() =>
    Number(localStorage.getItem('ltc_streak') || 0)
  );
  const recordLearningDay = () => {
    const today = new Date().toISOString().slice(0, 10);
    const lastDay = localStorage.getItem('ltc_last_active');
    if (lastDay === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const nextStreak = lastDay === yesterday ? streak + 1 : 1;
    setStreak(nextStreak);
    localStorage.setItem('ltc_streak', String(nextStreak));
    localStorage.setItem('ltc_last_active', today);
  };
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('HTML');
  const [authUser, setAuthUser] = useState<{ userId: string; email?: string; name?: string } | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [cloudReady, setCloudReady] = useState(false);
  const [authError, setAuthError] = useState('');
  const [syncStatus, setSyncStatus] = useState('Device only');
  const [tutorQuestion, setTutorQuestion] = useState('Explain this lesson to me in simpler words.');
  const [tutorReply, setTutorReply] = useState('');
  const [tutorBusy, setTutorBusy] = useState(false);
  const [tutorError, setTutorError] = useState('');
  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 2400);
    return () => window.clearTimeout(splashTimer);
  }, []);
  useEffect(() => {
    localStorage.setItem('ltc_theme', theme);
    localStorage.setItem('ltc_font_size', fontSize);
    localStorage.setItem('ltc_reduce_motion', String(reducedMotion));
  }, [theme, fontSize, reducedMotion]);
  useEffect(() => {
    let active = true;
    auth.getUser().then(async user => {
      if (!active) return;
      setAuthUser(user);
      if (user) {
        try {
          const response = await api.get('/api/progress');
          if (!active) return;
          const saved = response.data as { completed?: number[]; xp?: number };
          if (Array.isArray(saved.completed)) setCompleted(current => Array.from(new Set([...current, ...saved.completed!])));
          if (typeof saved.xp === 'number') setXp(current => Math.max(current, saved.xp!));
          setSyncStatus('Cloud synced');
        } catch { if (active) setSyncStatus('Cloud sync unavailable'); }
      }
      if (active) { setCloudReady(true); setAuthReady(true); }
    }).catch(() => { if (active) { setAuthError('Could not restore sign-in. Please retry.'); setCloudReady(true); setAuthReady(true); } });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!authUser || !cloudReady) return;
    const timer = window.setTimeout(() => {
      setSyncStatus('Syncing…');
      api.post('/api/progress', { completed, xp }).then(() => setSyncStatus('Cloud synced')).catch(() => setSyncStatus('Sync failed — saved on this device'));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [completed, xp, authUser, cloudReady]);
  const signIn = async () => { setAuthError(''); try { await auth.signInWithRedirect(); } catch (e) { setAuthError(e instanceof Error ? e.message : 'Sign-in failed. Retry.'); } };
  const signOut = async () => { await auth.signOut(); setAuthUser(null); setCloudReady(false); setSyncStatus('Device only'); };
  const askTutor = async () => {
    if (!authUser) { setTutorError('Sign in to use the AI tutor.'); return; }
    if (!activeLesson) return;
    setTutorBusy(true); setTutorError(''); setTutorReply('');
    try { const r = await api.post('/api/tutor', { language: activeLesson.topic, question: tutorQuestion, code: answer }); setTutorReply(r.data.answer || 'No explanation returned.'); }
    catch { setTutorError('Tutor unavailable. Check your connection and try again.'); }
    finally { setTutorBusy(false); }
  };
  useEffect(() => {
    localStorage.setItem('ltc_completed', JSON.stringify(completed));
    localStorage.setItem('ltc_xp', String(xp));
  }, [completed, xp]);
  const progress = Math.round((completed.length / lessons.length) * 100);
  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const courseLessons = lessons.filter(
    l => l.topic.toLowerCase() === activeCourse
  );
  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setAnswer(lesson.starter);
    setFeedback('');
    setPage('lesson');
  };
  const checkAnswer = () => {
    const clean = (s: string) =>
      s.toLowerCase().replace(/\s+/g, '').replace(/['"]/g, "'");
    if (clean(answer).includes(clean(activeLesson?.answer || ''))) {
      recordLearningDay();
      if (!completed.includes(activeLesson!.id)) {
        setCompleted(v => [...v, activeLesson!.id]);
        setXp(v => v + activeLesson!.xp);
      }
      setFeedback(
        'Correct! Lesson completed. You earned ' +
          (completed.includes(activeLesson!.id) ? 0 : activeLesson!.xp) +
          ' XP.'
      );
    } else
      setFeedback(
        'Not quite yet. Check the syntax and try again, or use the hint.'
      );
  };
  const runCode = () => {
    if (tab === 'HTML') { setOutput(code); return; }
    if (tab === 'CSS') {
      setOutput('<!doctype html><html><head><style>' + code + '</style></head><body><h1>CSS preview</h1><p>Change the styles and run again.</p></body></html>');
      return;
    }
    if (tab === 'JavaScript') {
      const source = JSON.stringify(code);
      setOutput('<!doctype html><html><body style="font:14px monospace;padding:16px;color:#222"><pre id="out">Running JavaScript…</pre><script>const source=' + source + ';const out=document.getElementById("out");const logs=[];console.log=(...v)=>logs.push(v.map(x=>typeof x==="object"?JSON.stringify(x):String(x)).join(" "));try{new Function(source)();out.textContent=logs.join("\\n")||"JavaScript ran successfully (no console output)."}catch(e){out.textContent=e.name+": "+e.message}</script></body></html>');
      return;
    }
    const source = JSON.stringify(code);
    setOutput('<!doctype html><html><body style="font:14px monospace;padding:16px;color:#222"><pre id="out">Loading Python runtime…</pre><script src="https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js"></script><script>(async()=>{const out=document.getElementById("out");try{const py=await loadPyodide();const source=' + source + ';const wrapped="import io, sys\\n_capture=io.StringIO()\\nsys.stdout=_capture\\nsys.stderr=_capture\\n"+source+"\\nsys.stdout=sys.__stdout__\\nsys.stderr=sys.__stderr__\\n_capture.getvalue()";const result=await py.runPythonAsync(wrapped);out.textContent=String(result)||"Python ran successfully (no output)."}catch(e){out.textContent="Python error: "+e.message}})()</script></body></html>');
  };
  const nav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'playground', label: 'Playground', icon: Code2 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  const Sidebar = () => (
    <aside className={mobileMenu ? 'sidebar open' : 'sidebar'}>
      <div className="brand">
        <img className="brand-mark brand-logo" src="./resources/learn-code-logo.png" alt="Learn to Code logo" />
        <div>
          <b>LEARN TO CODE</b>
          <small>BY LILMA STUDIOS</small>
        </div>
        <button className="close-menu" onClick={() => setMobileMenu(false)}>
          <X size={19} />
        </button>
      </div>
      <div className="side-label">WORKSPACE</div>
      {nav.map(n => (
        <button
          key={n.id}
          className={'nav-item ' + (page === n.id ? 'selected' : '')}
          onClick={() => {
            setPage(n.id);
            setActiveLesson(null);
            setMobileMenu(false);
          }}
        >
          <n.icon size={18} />
          {n.label}
          {n.id === 'learn' && <ChevronRight size={15} className="nav-arrow" />}
        </button>
      ))}
      <div className="side-card">
        <div className="side-card-icon">
          <Zap size={17} />
        </div>
        <b>Keep learning</b>
        <p>A little progress every day adds up.</p>
        <div className="mini-progress">
          <span style={{ width: progress + '%' }} />
        </div>
        <small>
          {completed.length} of {lessons.length} lessons done
        </small>
      </div>
      <button className="sidebar-bottom settings-launcher" onClick={() => { setPage('settings'); setActiveLesson(null); setMobileMenu(false); }} aria-label="Open settings">
        <div className="avatar">L</div>
        <div>
          <b>Lilma Studios</b>
          <small>Settings and preferences</small>
        </div>
        <Settings size={17} />
      </button>
    </aside>
  );
  return (
    <div className={'app-shell ' + (theme === 'light' ? 'theme-light ' : '') + 'font-' + fontSize + (reducedMotion ? ' reduce-motion' : '')}>
      {showSplash && <div className="launch-splash" role="status" aria-label="Learn to Code is starting"><img src="./resources/learn-code-logo.png" alt="" /><b>LEARN TO CODE</b><span>BY LILMA STUDIOS</span></div>}
      <Sidebar />
      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)}>
            <Menu />
          </button>
          <div className="crumb">
            Workspace <span>/</span>{' '}
            <b>
              {activeLesson
                ? 'Lesson'
                : nav.find(n => n.id === page)?.label || 'Home'}
            </b>
          </div>
          <div className="top-actions">
            <div className="streak">
              <Flame size={17} />
              <b>{streak}</b>
              <span>day streak</span>
            </div>
            <div className="xp-pill">
              <Zap size={16} />
              <b>{xp} XP</b>
            </div>
            {authReady && authUser ? <><span className="account-name">{authUser.name || authUser.email || 'Signed in'}</span><button className="account-btn" onClick={signOut}>Sign out</button><span className="sync-state">{syncStatus}</span></> : <button className="account-btn" onClick={signIn} disabled={!authReady}>Sign in / Create account</button>}
            <div className="avatar small-avatar">{authUser?.name?.slice(0,1).toUpperCase() || 'L'}</div>
          </div>
        </header>
        {authError && <div className="auth-alert">{authError}</div>}
        {page === 'home' && (
          <div className="content">
            <section className="welcome">
              <div>
                <div className="eyebrow">
                  <Sparkles size={14} /> YOUR CODING JOURNEY STARTS HERE
                </div>
                <h1>
                  Build skills.
                  <br />
                  <span>Build your future.</span>
                </h1>
                <p>
                  Learn programming one practical lesson at a time. No
                  experience needed.
                </p>
                <button
                  className="primary-btn"
                  onClick={() => setPage('learn')}
                >
                  Start learning <ChevronRight size={17} />
                </button>
              </div>
              <div className="hero-art">
                <img className="hero-photo" src="/resources/learn-code-hero.png" alt="Learn to Code coding illustration" />
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="code-float float-one">&lt;/&gt;</div>
                <div className="code-window">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div>
                    <span className="syntax-purple">const</span>{' '}
                    <span className="syntax-blue">future</span> ={' '}
                    <span className="syntax-green">'developer'</span>;
                  </div>
                  <div>
                    <span className="syntax-purple">console</span>.log(future);
                  </div>
                  <div className="cursor-line">▌</div>
                </div>
                <div className="code-float float-two">{}</div>
              </div>
            </section>
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon purple">
                  <BookOpen size={19} />
                </div>
                <div>
                  <b>
                    {completed.length}/{lessons.length}
                  </b>
                  <small>Lessons completed</small>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon yellow">
                  <Zap size={19} />
                </div>
                <div>
                  <b>{xp} XP</b>
                  <small>Total experience</small>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange">
                  <Flame size={19} />
                </div>
                <div>
                  <b>{streak} day</b>
                  <small>Learning streak</small>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">
                  <Target size={19} />
                </div>
                <div>
                  <b>{progress}%</b>
                  <small>Overall progress</small>
                </div>
              </div>
            </section>
            <div className="section-heading">
              <div>
                <h2>Choose your path</h2>
                <p>Start with the fundamentals and grow from there.</p>
              </div>
              <button className="text-btn" onClick={() => setPage('learn')}>
                View all courses <ChevronRight size={15} />
              </button>
            </div>
            <section className="course-grid">
              {courses.map(c => (
                <button
                  className="course-card"
                  key={c.id}
                  onClick={() => {
                    setActiveCourse(c.id);
                    setPage('learn');
                  }}
                >
                  <div className="course-top">
                    <span className="course-emoji">{c.icon}</span>
                    <span className="level-tag">{c.level}</span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.label}</p>
                  <div className="course-bottom">
                    <span>
                      {
                        lessons.filter(l => l.topic.toLowerCase() === c.id)
                          .length
                      }{' '}
                      starter lessons
                    </span>
                    <ChevronRight size={17} />
                  </div>
                </button>
              ))}
            </section>
            <section className="continue-card">
              <div className="continue-icon">
                <BookOpen size={21} />
              </div>
              <div className="continue-copy">
                <small>YOUR NEXT STEP</small>
                <b>
                  {lessons.find(l => !completed.includes(l.id))?.title ||
                    'You completed the starter lessons!'}
                </b>
                <span>Pick up where you left off.</span>
              </div>
              <button
                className="outline-btn"
                onClick={() => {
                  const next = lessons.find(l => !completed.includes(l.id));
                  if (next) startLesson(next);
                  else setPage('learn');
                }}
              >
                Continue <ChevronRight size={15} />
              </button>
            </section>
          </div>
        )}
        {page === 'learn' && (
          <div className="content">
            <div className="page-intro">
              <div className="eyebrow">COURSE LIBRARY</div>
              <h1>Explore courses</h1>
              <p>Choose a language and build your skills from the ground up.</p>
            </div>
            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses..."
              />
            </div>
            <section className="course-grid">
              {filteredCourses.map(c => (
                <button
                  className={
                    'course-card ' +
                    (activeCourse === c.id ? 'active-course' : '')
                  }
                  key={c.id}
                  onClick={() => setActiveCourse(c.id)}
                >
                  <div className="course-top">
                    <span className="course-emoji">{c.icon}</span>
                    <span className="level-tag">{c.level}</span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.label}</p>
                  <div className="course-bottom">
                    <span>
                      {
                        lessons.filter(l => l.topic.toLowerCase() === c.id)
                          .length
                      }{' '}
                      lessons available
                    </span>
                    <ChevronRight size={17} />
                  </div>
                </button>
              ))}
            </section>
            <div className="section-heading lesson-heading">
              <div>
                <h2>
                  {courses.find(c => c.id === activeCourse)?.name} lessons
                </h2>
                <p>
                  Complete lessons to earn XP and unlock your next milestone.
                </p>
              </div>
            </div>
            <div className="lesson-list">
              {courseLessons.length ? (
                courseLessons.map((l, i) => (
                  <button
                    className="lesson-row"
                    key={l.id}
                    onClick={() => startLesson(l)}
                  >
                    <div
                      className={
                        'lesson-number ' +
                        (completed.includes(l.id) ? 'done' : '')
                      }
                    >
                      {completed.includes(l.id) ? (
                        <Check size={17} />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </div>
                    <div className="lesson-info">
                      <b>{l.title}</b>
                      <span>
                        {l.minutes} min · {l.level}
                      </span>
                    </div>
                    <span className="lesson-xp">
                      <Zap size={14} />
                      {l.xp} XP
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))
              ) : (
                <div className="empty-state">
                  The next lessons for this course are being prepared. Try HTML
                  to begin.
                </div>
              )}
            </div>
          </div>
        )}
        {page === 'lesson' && activeLesson && (
          <div className="content lesson-content">
            <button className="back-link" onClick={() => setPage('learn')}>
              <ArrowLeft size={16} /> Back to courses
            </button>
            <div className="lesson-layout">
              <article className="lesson-main">
                <div className="eyebrow">
                  {activeLesson.topic.toUpperCase()} · LESSON {activeLesson.id}
                </div>
                <h1>{activeLesson.title}</h1>
                <div className="lesson-meta">
                  <span>
                    <Clock3 size={14} />
                    {activeLesson.minutes} minutes
                  </span>
                  <span>
                    <Zap size={14} />
                    {activeLesson.xp} XP
                  </span>
                  <span>{activeLesson.level}</span>
                </div>
                <div className="lesson-explain">
                  <h3>Let's understand this</h3>
                  <p>{activeLesson.description}</p>
                </div>
                <section className="teaching-panel">
                  <div className="teaching-kicker"><BookOpen size={16} /> FIRST, UNDERSTAND THE CODE</div>
                  <h2>What you are learning</h2>
                  <p className="teaching-intro">{lessonGuides[activeLesson.id]?.intro || activeLesson.description}</p>
                  <div className="teaching-example">
                    <div className="teaching-example-head"><span>WORKED EXAMPLE</span><span>Read it before typing</span></div>
                    <pre>{lessonGuides[activeLesson.id]?.example || activeLesson.starter}</pre>
                  </div>
                  <h3>What does each part mean?</h3>
                  <div className="code-parts-list">
                    {(lessonGuides[activeLesson.id]?.parts || []).map((part, index) => (
                      <div className="code-part" key={index}>
                        <code>{part.token}</code>
                        <p>{part.meaning}</p>
                      </div>
                    ))}
                  </div>
                  <h3>Let's walk through it</h3>
                  <ol className="walkthrough-list">
                    {(lessonGuides[activeLesson.id]?.walkthrough || []).map((step, index) => <li key={index}>{step}</li>)}
                  </ol>
                  {lessonGuides[activeLesson.id]?.note && <div className="teaching-note"><CircleHelp size={16}/><p>{lessonGuides[activeLesson.id].note}</p></div>}
                </section>
                <div className="task-panel">
                  <div className="task-label">
                    <Target size={16} /> NOW TRY IT YOURSELF
                  </div>
                  <h3>{activeLesson.task}</h3>
                  <p>Now that you understand the example, write the code yourself. You can return to the explanation whenever you need it.</p>
                </div>
                <div className="editor-panel">
                  <div className="editor-top">
                    <span>
                      <Code2 size={15} /> YOUR CODE
                    </span>
                    <span className="editor-language">
                      {activeLesson.topic}
                    </span>
                  </div>
                  <textarea
                    spellCheck={false}
                    value={answer}
                    onChange={e => {
                      setAnswer(e.target.value);
                      setFeedback('');
                    }}
                  />
                  <div className="editor-actions">
                    <button
                      className="hint-btn"
                      onClick={() => setFeedback('Hint: ' + activeLesson.hint)}
                    >
                      <CircleHelp size={15} /> Get a hint
                    </button>
                    <button className="primary-btn" onClick={checkAnswer}>
                      Check answer <Check size={16} />
                    </button>
                  </div>
                  {feedback && (
                    <div
                      className={
                        'feedback ' +
                        (feedback.startsWith('Correct') ? 'success' : '')
                      }
                    >
                      {feedback}
                    </div>
                  )}
                </div>
                <section className="tutor-panel">
                  <div className="tutor-heading"><Sparkles size={17}/><b>AI coding tutor</b><span>BY LILMA STUDIOS</span></div>
                  <p>Ask for an explanation, a hint or help understanding an error.</p>
                  <textarea value={tutorQuestion} onChange={e => setTutorQuestion(e.target.value)} aria-label="Ask the AI tutor" />
                  <button className="primary-btn" onClick={askTutor} disabled={tutorBusy}>{tutorBusy ? 'Thinking…' : 'Ask tutor'} <ChevronRight size={15}/></button>
                  {!authUser && <small>Sign in to use the AI tutor.</small>}
                  {tutorError && <div className="feedback">{tutorError}</div>}
                  {tutorReply && <div className="tutor-reply">{tutorReply}</div>}
                </section>
              </article>
              <aside className="lesson-aside">
                <div className="aside-progress">
                  <div className="aside-title">
                    YOUR PROGRESS <span>{progress}%</span>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: progress + '%' }} />
                  </div>
                  <p>{completed.length} lessons completed</p>
                </div>
                <div className="aside-tip">
                  <Sparkles size={18} />
                  <b>Learning tip</b>
                  <p>
                    Try changing the example and see what happens. Experimenting
                    helps concepts stick.
                  </p>
                </div>
                <div className="aside-xp">
                  <Zap size={18} />
                  <div>
                    <b>Earn {activeLesson.xp} XP</b>
                    <span>Complete this challenge to grow your score.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
        {page === 'playground' && (
          <div className="content">
            <div className="page-intro">
              <div className="eyebrow">PRACTICE SPACE</div>
              <h1>Code playground</h1>
              <p>
                Experiment with HTML, CSS, JavaScript and Python in your own workspace.
              </p>
            </div>
            <div className="playground-toolbar">
              <div className="language-tabs">
                {['HTML', 'CSS', 'JavaScript', 'Python'].map(t => (
                  <button
                    className={tab === t ? 'tab-active' : ''}
                    key={t}
                    onClick={() => { setTab(t); setCode(t === 'HTML' ? starterCode : t === 'CSS' ? 'h1 { color: purple; }' : t === 'JavaScript' ? 'console.log("Hello from Learn to Code!");' : 'print("Hello from Learn to Code!")'); setOutput(''); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button className="run-btn" onClick={runCode}>
                <Play size={15} fill="currentColor" /> Run preview
              </button>
            </div>
            <div className="playground-grid">
              <div className="play-editor">
                <div className="editor-top">
                  <span>
                    <Terminal size={15} /> {tab === 'HTML' ? 'index.html' : tab === 'CSS' ? 'styles.css' : tab === 'JavaScript' ? 'script.js' : 'main.py'}
                  </span>
                  <span className="live-dot">● Ready</span>
                </div>
                <textarea
                  spellCheck={false}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  aria-label="HTML code editor"
                />
                <div className="editor-footer">
                  <span>{tab === 'Python' ? 'Python · Pyodide' : tab === 'JavaScript' ? 'JavaScript · isolated frame' : tab === 'CSS' ? 'CSS preview' : 'HTML preview'}</span>
                  <button onClick={() => setCode(tab === 'HTML' ? starterCode : tab === 'CSS' ? 'h1 { color: purple; }' : tab === 'JavaScript' ? 'console.log("Hello from Learn to Code!");' : 'print("Hello from Learn to Code!")')}>
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
              <div className="preview-panel">
                <div className="preview-head">
                  <span>PREVIEW</span>
                  <span className="live-dot">● Local</span>
                </div>
                <iframe className="preview-output" title="Code output" sandbox="allow-scripts" srcDoc={output || '<!doctype html><html><body style="font-family:Arial;padding:28px;color:#555"><h2 style="color:#7658ee">Your output appears here</h2><p>Write code, then select Run preview.</p></body></html>'} />
              </div>
            </div>
            <p className="playground-note">
              <CircleHelp size={15} /> JavaScript runs in a sandboxed frame. Python runs locally with Pyodide WebAssembly; its runtime downloads on first use. Code is not sent to the app server. This browser sandbox is suitable for learning exercises, not hostile-code isolation.
            </p>
          </div>
        )}
        {page === 'settings' && (
          <div className="content settings-content">
            <div className="page-intro">
              <div className="eyebrow"><Settings size={14} /> PREFERENCES</div>
              <h1>Settings</h1>
              <p>Adjust how Learn to Code looks and behaves on this device.</p>
            </div>
            <section className="settings-section">
              <div className="settings-section-heading"><Sun size={18} /><div><b>Appearance</b><small>Choose the interface theme.</small></div></div>
              <div className="settings-choice-row">
                <button className={'settings-choice ' + (theme === 'dark' ? 'active' : '')} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}><Moon size={18} /><span>Dark</span>{theme === 'dark' && <CheckCircle2 size={16} />}</button>
                <button className={'settings-choice ' + (theme === 'light' ? 'active' : '')} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}><Sun size={18} /><span>Light</span>{theme === 'light' && <CheckCircle2 size={16} />}</button>
              </div>
            </section>
            <section className="settings-section">
              <div className="settings-section-heading"><Type size={18} /><div><b>Text size</b><small>Change the overall interface scale.</small></div></div>
              <div className="settings-choice-row">
                {(['small', 'normal', 'large'] as const).map(size => <button key={size} className={'settings-choice text-size-choice ' + (fontSize === size ? 'active' : '')} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}>{size === 'small' ? 'A− Small' : size === 'large' ? 'A+ Large' : 'A Normal'}{fontSize === size && <CheckCircle2 size={16} />}</button>)}
              </div>
            </section>
            <section className="settings-section settings-toggle-row">
              <div className="settings-section-heading"><Sparkles size={18} /><div><b>Reduce motion</b><small>Reduce non-essential interface animations.</small></div></div>
              <button className={'settings-switch ' + (reducedMotion ? 'on' : '')} onClick={() => setReducedMotion(value => !value)} role="switch" aria-checked={reducedMotion}><span /></button>
            </section>
            <section className="settings-section account-settings">
              <div className="settings-section-heading"><User size={18} /><div><b>Account</b><small>{authUser ? (authUser.name || authUser.email || 'Signed in') : 'Your learning progress is saved on this device.'}</small></div></div>
              {authUser ? <button className="outline-btn" onClick={signOut}>Sign out</button> : <button className="primary-btn" onClick={signIn} disabled={!authReady}>Sign in / Create account <ChevronRight size={15} /></button>}
              {authError && <p className="settings-note">{authError}</p>}
              <small className="settings-note">Progress sync: {syncStatus}</small>
            </section>
            <section className="settings-section about-settings">
              <div className="settings-section-heading"><Info size={18} /><div><b>About Learn to Code</b><small>Created and developed by Lilma Studios.</small></div></div>
              <div className="about-brand"><img src="./resources/learn-code-icon.png" alt="Learn to Code app icon" /><div><b>Learn to Code</b><span>Version 1.0 · © 2026 Lilma Studios</span></div></div>
            </section>
          </div>
        )}
        {page === 'achievements' && (
          <div className="content">
            <div className="page-intro">
              <div className="eyebrow">MILESTONES</div>
              <h1>Your achievements</h1>
              <p>Every completed challenge is progress worth celebrating.</p>
            </div>
            <div className="achievement-summary">
              <Trophy size={30} />
              <div>
                <b>{completed.length} / {lessons.length}</b>
              <span>Lessons completed</span>
              </div>
              <div className="achievement-track">
                <span style={{ width: progress + '%' }} />
              </div>
            </div>
            <div className="achievement-grid">
              {[
                {
                  name: 'First steps',
                  desc: 'Complete your first lesson',
                  icon: '🚀',
                  ok: completed.length >= 1,
                },
                {
                  name: 'HTML explorer',
                  desc: 'Finish the HTML starter lessons',
                  icon: '🌐',
                  ok: [1, 2, 3].every(id => completed.includes(id)),
                },
                {
                  name: 'Style maker',
                  desc: 'Complete a CSS lesson',
                  icon: '🎨',
                  ok: completed.includes(4),
                },
                {
                  name: 'Logic learner',
                  desc: 'Complete a JavaScript lesson',
                  icon: '⚡',
                  ok: completed.includes(5),
                },
                {
                  name: 'Python beginner',
                  desc: 'Complete a Python lesson',
                  icon: '🐍',
                  ok: completed.includes(6),
                },
                {
                  name: 'XP collector',
                  desc: 'Earn 100 experience points',
                  icon: '💎',
                  ok: xp >= 100,
                },
                {
                  name: 'Consistent learner',
                  desc: 'Build a 3-day learning streak',
                  icon: '🔥',
                  ok: streak >= 3,
                },
                {
                  name: 'Course explorer',
                  desc: 'Complete lessons in all four languages',
                  icon: '🧭',
                  ok: ['HTML', 'CSS', 'JavaScript', 'Python'].every(topic =>
                    lessons.some(l => l.topic === topic && completed.includes(l.id))
                  ),
                },
                {
                  name: 'Starter path finisher',
                  desc: 'Complete all 14 starter lessons',
                  icon: '🏆',
                  ok: completed.length >= lessons.length,
                },
              ].map(a => (
                <div
                  className={'achievement-card ' + (a.ok ? 'unlocked' : '')}
                  key={a.name}
                >
                  <div className="achievement-icon">{a.icon}</div>
                  <div>
                    <b>{a.name}</b>
                    <p>{a.desc}</p>
                    <small>{a.ok ? 'UNLOCKED' : 'IN PROGRESS'}</small>
                  </div>
                  {a.ok ? (
                    <CheckCircle2 className="achievement-check" size={19} />
                  ) : (
                    <Lock size={17} className="lock-icon" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
