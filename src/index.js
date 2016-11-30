'use strict'

const readline = require('readline');
const {write} = require('./Writer');

const SEPERATOR = '==========';
const OUTPUT_DIR = './';

function removeBOM(line) {
  return line.replace(/\uFEFF/g, '');
}

const books = new Map();
const TITLE = 0;
const LOC_TIME = 1;
const HIGHLIGHT = 2;

let state = TITLE;
let title = null;
let content = '';
function parseLine(line) {
  if (line.trim().length === 0) {
    return;
  }
  line = removeBOM(line);
  switch (state) {
    case TITLE:
      state = LOC_TIME;
      title = line;
      break;
    case LOC_TIME:
      state = HIGHLIGHT;
      break;
    case HIGHLIGHT:
      if (line != SEPERATOR) {
        content += line;
        break;
      }
      if (!books.has(title)) {
        books.set(title, new Array());
      }
      const highlights = books.get(title);
      highlights.push(content);

      state = TITLE;
      content = '';
      break;
  }
}

let output_dir = null;
if (process.argv.length > 2) {
  output_dir = process.argv[2];
}

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout
});
rl.on('line', parseLine);
rl.on('close', () => {
  write(output_dir || OUTPUT_DIR, books);
});
