const fs = require('fs');
const path = require('path');

const fileEndings = ['.tsx'];

function transform(content) {
    // Regex to match any class starting with dark:
    // It matches dark:[...] or dark:... up to space, quote or backtick
    // Be careful not to remove the spaces adjacent to it
    // We will just match dark:[^\s"'`]+ and replace with empty string
    // then clean up multiple spaces
    
    let newContent = content.replace(/dark:[^\s"'`]+/g, '');
    
    // clean up duplicate spaces inside classNames
    newContent = newContent.replace(/className=(["`'])\s+/g, 'className=$1');
    newContent = newContent.replace(/\s+(["`'])/g, '$1');
    newContent = newContent.replace(/\s{2,}/g, ' ');

    return newContent;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let finalContent = transform(content);
  
  if (content !== finalContent) {
     fs.writeFileSync(filePath, finalContent);
     console.log("Removed dark mode classes from", filePath);
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
