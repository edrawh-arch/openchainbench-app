const fs = require('fs');
const path = require('path');

const fileEndings = ['.tsx'];

// We update backgrounds to look more distinct
// We use #0A0A0A for cards (which used bg-white)
// and border to #222
function transform(content) {
    let newContent = content;
    // Replace dark:bg-[#000000] that were generated from bg-white
    // WITH EXCEPTION: we don't want to change app/layout.tsx which should stay pure black
    newContent = newContent.replace(/dark:bg-\[#000000\]/g, 'dark:bg-[#0A0A0A]');
    // Also fix any stray elements
    return newContent;
}

function processFile(filePath) {
  if (filePath.includes('theme-toggle.tsx') || filePath.includes('theme-provider.tsx') || filePath.includes('footer.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let finalContent = transform(content);
  // Restore true black in layout body
  if (filePath.includes('layout.tsx')) {
      finalContent = finalContent.replace('dark:bg-[#0A0A0A]', 'dark:bg-[#000000]');
  }
  
  if (content !== finalContent) {
     fs.writeFileSync(filePath, finalContent);
     console.log("Updated bg", filePath);
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
