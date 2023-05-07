const fs = require('fs').promises;
const path = require('path');

const currentFolderPath = path.join(__dirname, './files');
const copyFolderPath = path.join(__dirname, './files-copy');

async function copyFiles() {
  // Delete if exist copy folder
  await fs.rm(copyFolderPath, { recursive: true, force: true });

  // create copy folder
  await fs.mkdir(copyFolderPath);

  // copy files
  const files = await fs.readdir(currentFolderPath);
  files.map(async (file) => {
    const sourcePath = path.join(currentFolderPath, file);
    const destinationPath = path.join(copyFolderPath, file);
    await fs.copyFile(sourcePath, destinationPath);
  });

  console.log('Files copied success.');
}

copyFiles();
