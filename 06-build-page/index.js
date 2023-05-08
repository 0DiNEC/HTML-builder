const fs = require('fs');
const path = require('path');

const outputFolderPath = path.join(__dirname, 'project-dist');
const sourceHTML = path.join(__dirname, 'template.html');
const targetHTML = path.join(outputFolderPath, 'template.html');

// make output dir
async function makeDir() {
  await fs.promises.rm(outputFolderPath, { recursive: true, force: true });
  await fs.promises.mkdir(outputFolderPath);
}

// copy Files
async function copyFile() {
  await fs.promises.copyFile(sourceHTML, targetHTML);

  // copy css
  const cssFilePath = path.join(outputFolderPath, 'style.css');
  await fs.promises.writeFile(cssFilePath, '');
  const pathCSS = path.join(__dirname, 'styles\\');
  const filesCSS = (await fs.promises.readdir(pathCSS)).filter(
    (file) => path.extname(file) === '.css'
  );

  for (const file of filesCSS) {
    const filePath = path.join(pathCSS, file);
    const sourceDataFileCSS = await fs.promises.readFile(filePath, 'utf-8');

    await fs.promises.appendFile(cssFilePath, sourceDataFileCSS, () => {});
  }

  // copy Assets
  const assetsSourcePath = path.join(__dirname, 'assets');
  const assetsTargetPath = path.join(outputFolderPath, 'assets');

  await fs.promises.rm(assetsTargetPath, { recursive: true, force: true });

  // create copy folder
  const copyFolder = async (sourcePath, destinationPath) => {
    await fs.promises.mkdir(destinationPath);
    const assetsFiles = await fs.promises.readdir(sourcePath);
    for (const file of assetsFiles) {
      const sourcePathFile = path.join(sourcePath, file);
      const destinationPathFile = path.join(destinationPath, file);
      const fileStats = await fs.promises.stat(sourcePathFile);

      if (fileStats.isDirectory()) {
        await copyFolder(sourcePathFile, destinationPathFile);
      } else {
        await fs.promises.copyFile(sourcePathFile, destinationPathFile);
      }
    }
  };

  copyFolder(assetsSourcePath, assetsTargetPath);
}

async function createHTML(componentsPath) {
  const files = await fs.promises.readdir(componentsPath);

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
  makeDir().then(() => {
    copyFile().then(() => {
      createHTML(path.join(__dirname, 'components'));
    });
  });
}

buildPage();
