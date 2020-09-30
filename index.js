#!/usr/bin/env node
import minimist from 'minimist';
import cipher from './cipher.js';
import fs from 'fs';



const argv = minimist(process.argv);

const returnObject = {
  shift: 'N/A',
  input: 'N/A',
  output: 'N/A',
  action: 'N/A'
};

const normaliseKeys = {
  s: 'shift',
  shift: 'shift',
  i: 'input',
  input: 'input',
  o: 'output',
  output: 'output',
  a: 'action',
  action: 'action',
};

const normaliseKeysArray = Object.keys(normaliseKeys);

const args = {
  shift: 'shift',
  input: 'input file',
  output: 'output file',
  action: 'action',
};
// console.log('Hi');
let keys = Object.keys(argv);


keys.map((i) => {
  if (normaliseKeysArray.includes(i)) {
    returnObject[normaliseKeys[i]] = argv[i]
  }
})
const text = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';
const cText = 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD';
const text1 = 'This is secret. Message about "_" symbol!';
const fileText = fs.readFileSync('./textNew.txt', 'utf8');
// console.log(fileText);

const newFileText = fs.readFileSync('./text.txt', 'utf8').concat('\n').concat(cipher(returnObject.shift, fileText.toUpperCase()));
// let retData = cipher(returnObject.shift, fileText.toUpperCase());
fs.writeFileSync('./text.txt', newFileText, 'utf8');
// const shift = keys.includes()
// console.log(argv);
