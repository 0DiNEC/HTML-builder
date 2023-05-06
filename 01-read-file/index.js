const fs = require('node:fs');
const path = require('path');
let outputData = '';
const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

input.on('data', data => outputData += data);
input.on('end', () => console.log(outputData));