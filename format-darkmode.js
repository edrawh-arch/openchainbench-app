const fs = require('fs');
const path = require('path');

const fileEndings = ['.tsx'];

const classesMap = {
    // Backgrounds
    'bg-white': 'dark:bg-[#000000]',
    'bg-[#FAFAFA]': 'dark:bg-[#080808]',
    'bg-[#F5F5F5]': 'dark:bg-[#111111]',
    'bg-[#F0F0F0]': 'dark:bg-[#1A1A1A]',
    'bg-[#F9F9F9]': 'dark:bg-[#0A0A0A]',
    'bg-white/80': 'dark:bg-[#000000]/80',
    'bg-white/50': 'dark:bg-[#000000]/50',

    // Borders
    'border-[#E5E5E5]': 'dark:border-[#222222]',
    'border-[#F0F0F0]': 'dark:border-[#1A1A1A]',
    'border-[#CCC]': 'dark:border-[#333333]',

    // Text
    'text-[#111]': 'dark:text-white',
    'text-[#555]': 'dark:text-[#A1A1AA]', // zinc-400
    'text-[#666]': 'dark:text-[#A1A1AA]',
    'text-[#777]': 'dark:text-[#A1A1AA]',
    'text-[#888]': 'dark:text-[#71717A]', // zinc-500
    'text-[#AAA]': 'dark:text-[#52525B]', // zinc-600

    // Hover
    'hover:bg-[#F9F9F9]': 'dark:hover:bg-[#111111]',
    'hover:bg-[#F5F5F5]': 'dark:hover:bg-[#1A1A1A]',
    'hover:border-[#CCC]': 'dark:hover:border-[#444444]',
    'hover:border-[#111]': 'dark:hover:border-[#FFFFFF]',
    'hover:text-[#111]': 'dark:hover:text-[#FFFFFF]',
    'placeholder:text-[#AAA]': 'dark:placeholder:text-[#52525B]'
};

function transform(content) {
    let newContent = content;
    
    // Cleanup bad/duplicate dark mode classes first
    const badClasses = [
        'dark:bg-[#000000]', 'dark:bg-[#0a0a0a]', 'dark:bg-[#111111]', 'dark:bg-[#151515]', 'dark:bg-[#333333]', 'dark:bg-[#080808]', 'dark:bg-[#1A1A1A]', 'dark:bg-[#0A0A0A]',
        'dark:bg-[#000000]/80', 'dark:bg-[#000000]/50', 'dark:bg-[#0a0a0a]/50', 'dark:bg-[#0a0a0a]/80',
        'dark:border-[#333333]', 'dark:border-[#222222]', 'dark:border-[#444444]', 'dark:border-[#666666]', 'dark:border-[#888888]', 'dark:border-[#333]', 'dark:border-[#222]',
        'dark:border-[#1A1A1A]',
        'dark:border-white/10', 'dark:border-white/15', 'dark:border-white/20',
        'dark:text-white', 'dark:text-[#EAEAEA]', 'dark:text-[#CCCCCC]', 'dark:text-[#BBBBBB]', 'dark:text-[#AAAAAA]', 'dark:text-[#888888]', 'dark:text-[#777777]', 'dark:text-[#666666]', 'dark:text-[#444444]',
        'dark:text-[#AAA]', 'dark:text-[#888]', 'dark:text-[#666]', 'dark:text-[#A1A1AA]', 'dark:text-[#71717A]', 'dark:text-[#52525B]',
        'dark:hover:bg-[#151515]', 'dark:hover:bg-[#222222]', 'dark:hover:bg-[#111111]', 'dark:hover:bg-[#1A1A1A]',
        'dark:hover:border-[#555555]', 'dark:hover:border-[#AAAAAA]', 'dark:hover:border-white/20',
        'dark:hover:border-[#444444]', 'dark:hover:border-[#FFFFFF]',
        'dark:hover:text-white', 'dark:hover:text-[#CCCCCC]', 'dark:hover:text-[#FFFFFF]',
        'dark:placeholder:text-[#666666]', 'dark:placeholder:text-[#555555]',
        'dark:placeholder:text-[#666]', 'dark:placeholder:text-[#52525B]'
    ];
    
    // Also clear these specific duplicated styles from previous bot runs
    badClasses.forEach(bc => {
        // use replace with regex to avoid matching substrings incorrectly, e.g. text-white in hover:text-white
        newContent = newContent.replace(new RegExp(`(?<=\\s|["'\`])${bc.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\//g, '\\/') }(?!-[a-zA-Z0-9])`, 'g'), '');
    });
    // Remove extra spaces left by removal
    newContent = newContent.replace(/\s{2,}/g, ' ');
    newContent = newContent.replace(/className=" /g, 'className="');
    newContent = newContent.replace(/className={\` /g, 'className={`');

    let replacedClassNames = newContent.replace(/(?:className=|class\s*=)\s*(["'])(.*?)\1/g, (match, quote, classStr) => {
        let words = classStr.trim().split(/\s+/);
        let finalWords = [...words];
        
        for (let word of words) {
            if (classesMap[word]) {
                finalWords.push(classesMap[word]);
            }
        }
        // Deduplicate
        return `className="${Array.from(new Set(finalWords)).join(' ')}"`;
    });

    replacedClassNames = replacedClassNames.replace(/className\s*=\s*\{`([\s\S]*?)`\}/g, (match, classStr) => {
        let words = classStr.trim().split(/\s+/);
        let finalWords = [...words];
        
        for (let word of words) {
            // handle conditional classes e.g. ${isActive ? "bg-white" : "bg-black"} -> we won't perfectly parse these without AST but let's try mapping the literals
            if (classesMap[word]) {
                finalWords.push(classesMap[word]);
            }
        }
        return `className={\`${Array.from(new Set(finalWords)).join(' ')}\`}`;
    });

    return replacedClassNames;
}

function processFile(filePath) {
  if (filePath.includes('theme-toggle.tsx') || filePath.includes('theme-provider.tsx') || filePath.includes('footer.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let finalContent = transform(content);
  if (content !== finalContent) {
     fs.writeFileSync(filePath, finalContent);
     console.log("Modified", filePath);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fileEndings.some(ext => fullPath.endsWith(ext))) {
      processFile(fullPath);
    }
  }
}

processDirectory(path.join(__dirname, 'app'));
processDirectory(path.join(__dirname, 'components'));
