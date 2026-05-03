const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = {
  '#0d0d0d': '#030712', // Dark slate background
  '#ff5722': '#6366f1', // Indigo primary accent
  '#e8e6e1': '#f3f4f6', // Light gray text
  'Outfit': 'Inter',
  'JetBrains Mono': 'Fira Code'
};

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldVal, newVal] of Object.entries(replacements)) {
        if (content.includes(oldVal)) {
          content = content.split(oldVal).join(newVal);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walkAndReplace(directoryPath);
