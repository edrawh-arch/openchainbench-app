const fs = require('fs');
const path = require('path');

const fileEndings = ['.tsx'];

const mappings = {
  // Backgrounds
  'bg-white': 'dark:bg-[#000000]',
  'bg-\\[#FAFAFA\\]': 'dark:bg-[#0a0a0a]',
  'bg-\\[#F5F5F5\\]': 'dark:bg-[#111111]',
  'bg-\\[#F9F9F9\\]': 'dark:bg-[#151515]',
  'bg-\\[#E5E5E5\\]': 'dark:bg-[#333333]',
  
  // Background with opacity
  'bg-white/80': 'dark:bg-[#000000]/80',
  'bg-white/50': 'dark:bg-[#000000]/50',

  // Borders
  'border-\\[#E5E5E5\\]': 'dark:border-[#333333]',
  'border-\\[#F0F0F0\\]': 'dark:border-[#222222]',
  'border-\\[#CCC\\]': 'dark:border-[#444444]',
  'border-\\[#888\\]': 'dark:border-[#666666]',
  'border-\\[#111\\]': 'dark:border-[#888888]',
  'border-black/5': 'dark:border-white/10',
  'border-black/10': 'dark:border-white/15',

  // Text
  'text-\\[#111\\]': 'dark:text-white',
  'text-\\[#222\\]': 'dark:text-[#EAEAEA]',
  'text-\\[#444\\]': 'dark:text-[#CCCCCC]',
  'text-\\[#555\\]': 'dark:text-[#BBBBBB]',
  'text-\\[#666\\]': 'dark:text-[#AAAAAA]',
  'text-\\[#888\\]': 'dark:text-[#888888]',
  'text-\\[#999\\]': 'dark:text-[#777777]',
  'text-\\[#AAA\\]': 'dark:text-[#666666]',
  'text-\\[#CCC\\]': 'dark:text-[#444444]',

  // Hover Backgrounds
  'hover:bg-\\[#F9F9F9\\]': 'dark:hover:bg-[#151515]',
  'hover:bg-\\[#F5F5F5\\]': 'dark:hover:bg-[#222222]',
  'hover:bg-white': 'dark:hover:bg-[#111111]',
  
  // Hover Borders
  'hover:border-\\[#CCC\\]': 'dark:hover:border-[#555555]',
  'hover:border-\\[#111\\]': 'dark:hover:border-[#AAAAAA]',
  'hover:border-\\[#111\\]/20': 'dark:hover:border-white/20',

  // Hover Text
  'hover:text-\\[#111\\]': 'dark:hover:text-white',
  'hover:text-\\[#555\\]': 'dark:hover:text-[#CCCCCC]',
  
  // Placeholders
  'placeholder:text-\\[#888\\]': 'dark:placeholder:text-[#666666]',
  'placeholder:text-\\[#AAA\\]': 'dark:placeholder:text-[#555555]',
};

// Note: Ensure the values from the previous script don't end up duplicating if they already exist.
function transform(content) {
    let newContent = content.replace(/(?:className=|class\s*=)\s*(["'])(.*?)\1/g, (match, quote, classStr) => {
        let words = classStr.split(/\s+/);
        let darkWords = new Set(words);
        
        for (let word of words) {
            for (let [pattern, darkClass] of Object.entries(mappings)) {
                // If it's an exact match after removing backslashes from regex representation
                let cleanPattern = pattern.replace(/\\\\/g, '\\');
                if (new RegExp(`^${cleanPattern}$`).test(word)) {
                   darkWords.add(darkClass);   
                }
            }
        }
        return `className="${Array.from(darkWords).join(' ')}"`;
    });

    newContent = newContent.replace(/className\s*=\s*\{`([\s\S]*?)`\}/g, (match, classStr) => {
        let words = classStr.split(/\s+/);
        let darkWords = new Set(words);
        
        for (let word of words) {
            for (let [pattern, darkClass] of Object.entries(mappings)) {
                let cleanPattern = pattern.replace(/\\\\/g, '\\');
                if (new RegExp(`^${cleanPattern}$`).test(word)) {
                   darkWords.add(darkClass);   
                }
            }
        }
        return `className={\`${Array.from(darkWords).join(' ')}\`}`;
    });

    return newContent;
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
