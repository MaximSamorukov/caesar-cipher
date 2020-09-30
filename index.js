#!/usr/bin/env node
import minimist from 'minimist';

const argv = minimist(process.argv);
console.log('Hi');
let answer = 'False request';
let keys = Object.keys(argv);
console.log(keys);
if (keys.includes('a')) {
  answer = argv['a'];
}

console.log(answer);