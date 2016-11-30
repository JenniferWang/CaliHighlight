'use strict';

const fs = require('fs');
const path = require('path');

function write(outputDir, books) {
  books.forEach((highlights, title) => {
    const file = title + '-notes.md';
    const filePath = path.join(outputDir, file);
    const content = highlights.map(h => '* ' + h).join('\n');
    writeFile(filePath, content);
  });
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', resolve);
  });
}

module.exports = {write};
