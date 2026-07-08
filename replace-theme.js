const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceInFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replacements
  content = content.replace(/bg-black\/80/g, 'bg-slate-900/40');
  content = content.replace(/bg-black\/[0-9]+/g, 'bg-slate-900/5');
  content = content.replace(/text-white\/([0-9]+)/g, 'text-text-primary/$1');
  content = content.replace(/text-white/g, 'text-text-primary');
  content = content.replace(/border-white\/([0-9]+)/g, 'border-text-primary/$1');
  content = content.replace(/bg-white\/([0-9]+)/g, 'bg-slate-900/$1'); // Map white overlays to dark overlays
  content = content.replace(/from-black\/([0-9]+)/g, 'from-slate-900/5');
  content = content.replace(/to-black\/([0-9]+)/g, 'to-slate-900/5');
  content = content.replace(/from-black/g, 'from-background');
  content = content.replace(/to-black/g, 'to-background');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir('app', replaceInFile);
walkDir('components', replaceInFile);
console.log('Done!');
