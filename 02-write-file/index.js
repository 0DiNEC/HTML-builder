const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

const process = require('process');

process.addListener('SIGINT', () => {
  stream.end();
  process.exit();
});

console.log('\nWrite text:');
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.emit('SIGINT');
  } else {
    stream.write(data, 'utf-8');
  }
});

process.addListener('exit', () => console.log('\nSee you later!\n'));
