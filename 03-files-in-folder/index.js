const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, './secret-folder');

console.log('\nfiles in directory secret-folder:');
console.log('File\t|    Extension\t|\tSize');
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        const fileExtension = path.extname(file);
        const fileName = path.basename(file, fileExtension);
        const fileSize = stats.size / 1024;
        console.log(`${fileName}\t|\t${fileExtension}\t|  ${fileSize}kb`);
      }
    });
  });
});
