const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('c:/Users/Isa/Documents/psf-saojose-web/react-app/src/pages');
const componentPath = 'c:/Users/Isa/Documents/psf-saojose-web/react-app/src/components/common/BackButton.jsx';

const targetDirs = [
  'services',
  'groups',
  'team',
  '.' // root pages like ACS.jsx
];

const skipFiles = ['Home.jsx', 'NotFound.jsx', 'SearchResultsPage.jsx'];

function getRelativeImportPath(sourceFile, targetFile) {
  let rel = path.relative(path.dirname(sourceFile), targetFile);
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace(/\\/g, '/').replace('.jsx', '');
}

function processFile(filePath) {
  const fileName = path.basename(filePath);
  if (skipFiles.includes(fileName)) return;
  if (!fileName.endsWith('.jsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has BackButton
  if (content.includes('<BackButton')) {
    console.log(`Skipping ${fileName}: already has BackButton`);
    return;
  }

  // Determine insertion point (looking for max-w container inside PageContainer or similar)
  // Pattern: <div className="... max-w-..." ...>
  const containerRegex = /(<div className="[^"]*max-w-[0-9][xl][^"]*"[^>]*>)/;
  
  if (!containerRegex.test(content)) {
    console.log(`Skipping ${fileName}: no matching container found`);
    return;
  }

  // Calculate import path
  const importPath = getRelativeImportPath(filePath, componentPath);
  const importStatement = `import BackButton from "${importPath}";\n`;

  // Insert import
  // Find last import
  const lastImportRegex = /import .* from .*\n/g;
  let match;
  let lastImportIndex = 0;
  while ((match = lastImportRegex.exec(content)) !== null) {
    lastImportIndex = match.index + match[0].length;
  }
  
  if (lastImportIndex === 0) {
    // No imports? Prepend
    content = importStatement + content;
  } else {
    content = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
  }

  // Insert Component
  content = content.replace(containerRegex, `$1\n        <BackButton />`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${fileName}`);
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
        // recursively process if needed, but we are targeting specific list
    } else {
        processFile(fullPath);
    }
  }
}

targetDirs.forEach(d => {
  const fullDirPath = path.join(rootDir, d);
  console.log(`Processing directory: ${fullDirPath}`);
  if (fs.existsSync(fullDirPath)) {
      traverse(fullDirPath);
  }
});
