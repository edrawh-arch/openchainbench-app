const fs = require('fs');
const path = require('path');

const fileEndings = ['.tsx'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/\{" "\}/g, '');
  if (content !== newContent) {
     fs.writeFileSync(filePath, newContent);
     console.log("Cleaned spaces", filePath);
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
