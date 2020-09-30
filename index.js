#!/usr/bin/env node
import minimist from 'minimist';
import cipher from './cipher.js';



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
console.log('Hi');
let keys = Object.keys(argv);


keys.map((i) => {
  if (normaliseKeysArray.includes(i)) {
    returnObject[normaliseKeys[i]] = argv[i]
  }
})
const text = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';
const cText = 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD'
cipher(returnObject.shift, cText);
// const shift = keys.includes()
