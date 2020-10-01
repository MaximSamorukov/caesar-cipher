#!/usr/bin/env node
import minimist from 'minimist';
import cipher from './cipher.js';
import fs, { Stats } from 'fs';
import Stream from 'stream';



const argv = minimist(process.argv);

const returnObject = {
  shift: false,
  input: false,
  output: false,
  action: false
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

let keys = Object.keys(argv);


keys.map((i) => {

  if (normaliseKeysArray.includes(i)) {

    returnObject[normaliseKeys[i]] = argv[i] !== true ? argv[i] : false;
  }

  return i;
})
const text = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';
const cText = 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD';
const text1 = 'This is secret. Message about "_" symbol!';
let streamFromFile;
let streamToFile;
let returnValue;
let value = '';
const { shift, action, output, input } = returnObject;
console.log(returnObject);

if (output !== false) {
  fs.open(output, (err, fd) => {
    if (err) {
      console.log('Destination file. There is no file with stated address or access denied.');
      process.exit(1);
    } else {
      streamFromFile = (input === false) ? process.stdin : fs.createReadStream(input, 'utf8');
      streamToFile = (output === false) ? process.stdout : fs.createWriteStream(output, 'utf8');
      const fromTerminal = process.stdin;
      const toTerminal = process.stdout;
      const toTerminalError = process.stderr;
      // console.log(streamFromFile);
      streamFromFile.on('error', (er) => {
        console.log('Source file. There is no file with stated address or access denied.');
      });
      // streamFromFile.pipe(streamToFile);

      streamToFile
        .on('error', (er) => {
          console.log('File to write to. There is no file with stated address or access denied.');
        })
        .on('pipe', () => {
          console.log('I\'m piped');
        })

      if ((action !== 'encode' && action !== 'decode') || shift === false) {
        const actionFlag = (action !== 'encode' && action !== 'decode');
        const actionFlagMessage = actionFlag ? 'Action is incorrect. ' : '';
        const shiftFlag = (shift === false);
        const shiftFlagMessage = shiftFlag ? 'Shift value is incorrect.' : '';
        const errorMessage = `${actionFlagMessage}${shiftFlagMessage}\n`;
        toTerminalError.write(errorMessage);
        process.exit(1);
      }
      streamFromFile.on('data', (chunk) => {
        chunk = ((typeof chunk === 'object') ? chunk.toString() : chunk).toUpperCase();
        console.log(chunk);
        returnValue = cipher(returnObject, chunk);
        console.log('returnValue');
        console.log(returnValue);
        streamToFile.write(returnValue);
      });
      // console.log(streamFromFile);
    }
  })

} else {
  streamFromFile = (input === false) ? process.stdin : fs.createReadStream(input, 'utf8');
  streamToFile = (output === false) ? process.stdout : fs.createWriteStream(output, 'utf8');
  // console.log(streamFromFile);
  streamFromFile.on('error', (er) => {
    console.log('Source file. There is no file with stated address or access denied.');
  });
  streamFromFile.pipe(streamToFile);

  streamToFile
    .on('error', (er) => {
      console.log('File to write to. There is no file with stated address or access denied.');
    })
    .on('pipe', () => {
      console.log('I\'m piped');
    })

  if ((action !== 'encode' && action !== 'decode') || shift === false) {
    const actionFlag = (action !== 'encode' && action !== 'decode');
    const actionFlagMessage = actionFlag ? 'Action is incorrect. ' : '';
    const shiftFlag = (shift === false);
    const shiftFlagMessage = shiftFlag ? 'Shift value is incorrect.' : '';
    const errorMessage = `${actionFlagMessage}${shiftFlagMessage}\n`;
    process.stderr.write(errorMessage);
    process.exit(1);
  }
  streamFromFile.on('data', (chunk) => {
    chunk = ((typeof chunk === 'object') ? chunk.toString() : chunk).toUpperCase();
    console.log(chunk);
    returnValue = cipher(returnObject, chunk);
    console.log('returnValue');
    console.log(returnValue);
    streamToFile.write(returnValue);
  });
}
// returnValue = cipher(returnObject, cText);


