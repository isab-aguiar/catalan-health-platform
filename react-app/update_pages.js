const fs = require("fs");
const path = require("path");
const rootDir = path.resolve(
  "c:/Users/Isa/Documents/psf-saojose-web/react-app/src/pages"
);
const componentPath =
  "c:/Users/Isa/Documents/psf-saojose-web/react-app/src/components/common/BackButton.jsx";
const targetDirs = ["services", "groups", "team", "."];
const skipFiles = ["Home.jsx", "NotFound.jsx", "SearchResultsPage.jsx"];
function getRelativeImportPath(sourceFile, targetFile) {
  let rel = path.relative(path.dirname(sourceFile), targetFile);
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.replace(/\\/g, "/").replace(".jsx", "");
}
function processFile(filePath) {
  const fileName = path.basename(filePath);
  if (skipFiles.includes(fileName)) return;
  if (!fileName.endsWith(".jsx")) return;
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("<BackButton")) {
    console.log(`Skipping ${fileName}: already has BackButton`);
    return;
  }
  const containerRegex = /(<div className="[^"]*max-w-[0-9][xl][^"]*"[^>]*>)/;
  if (!containerRegex.test(content)) {
    console.log(`Skipping ${fileName}: no matching container found`);
    return;
  }
  const importPath = getRelativeImportPath(filePath, componentPath);
  const importStatement = `import BackButton from "${importPath}";\n`;
  const lastImportRegex = /import .* from .*\n/g;
  let match;
  let lastImportIndex = 0;
  while ((match = lastImportRegex.exec(content)) !== null) {
    lastImportIndex = match.index + match[0].length;
  }
  if (lastImportIndex === 0) {
    content = importStatement + content;
  } else {
    content =
      content.slice(0, lastImportIndex) +
      importStatement +
      content.slice(lastImportIndex);
  }
  content = content.replace(containerRegex, `$1\n        <BackButton />`);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated ${fileName}`);
}
function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
    } else {
      processFile(fullPath);
    }
  }
}
targetDirs.forEach((d) => {
  const fullDirPath = path.join(rootDir, d);
  console.log(`Processing directory: ${fullDirPath}`);
  if (fs.existsSync(fullDirPath)) {
    traverse(fullDirPath);
  }
});
