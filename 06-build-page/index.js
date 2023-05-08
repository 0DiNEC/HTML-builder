const fs = require('fs');
const path = require('path');

const outputFolderPath = path.join(__dirname, 'project-dist');

// make output dir
async function makeDir() {
  await fs.promises.rm(outputFolderPath, { recursive: true, force: true });
  await fs.promises.mkdir(outputFolderPath);
}

async function copyPageElements() {
    // copy css
  const sourceFolderPath = path.join(__dirname, 'styles');
  const outputFilePath = path.join(__dirname, 'project-dist', 'style.css');


}

async function createHTML(componentsPath) {
  const files = await fs.promises.readdir(componentsPath);
  const targetHTML = path.join(outputFolderPath, 'template.html');

  for (const file of files) {
    if (path.extname(file).toLowerCase() === '.html') {
      const component = `{{${path.basename(file, path.extname(file))}}}`;
      const componentsData = await fs.promises.readFile(
        path.join(componentsPath, file),
        'utf-8'
      );

      let targetData = await fs.promises.readFile(targetHTML, 'utf-8');
      targetData = targetData.replace(component, componentsData);
      await fs.promises.writeFile(targetHTML, targetData);
    }
  }
}

function buildPage() {
  // makeDir();
  // createHTML(path.join(__dirname, 'components'));
}

buildPage();
