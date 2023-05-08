const fs = require('fs');
const path = require('path');

const sourceFolderPath = path.join(__dirname, '\\styles');
const outputFilePath = path.join(__dirname, '\\project-dist\\bundle.css');

fs.writeFile(outputFilePath, '', () => {});

fs.readdir(sourceFolderPath, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  cssFiles.forEach((file) => {
    const filePath = path.join(sourceFolderPath, file);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;

      fs.appendFile(outputFilePath, data, () => {});
    });
  });
});
