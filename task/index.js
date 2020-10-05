#!/usr/bin/env node
import minimist from 'minimist';
import cipher from './cipher';
import fs from 'fs';

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

let streamFromFile;
let streamToFile;
let returnValue;
let value = '';
const { shift, action, output, input } = returnObject;
if (output !== false) {
  fs.open(output, (err, fd) => {
    if (err) {
      console.error('Destination file. There is no file with stated address or access denied.');
      process.exit(1);
    } else {
      streamFromFile = (input === false) ? process.stdin : fs.createReadStream(input, 'utf8');
      streamToFile = (output === false) ? process.stdout : fs.createWriteStream(output, 'utf8');
      const fromTerminal = process.stdin;
      const toTerminal = process.stdout;
      const toTerminalError = process.stderr;
      streamFromFile.on('error', (er) => {
        console.error('Source file. There is no file with stated address or access denied.');
        process.exit(1);
      });

      streamToFile
        .on('error', (er) => {
          console.error('File to write to. There is no file with stated address or access denied.');
          process.exit(1);
        })
        .on('pipe', () => {
          console.log('I\'m piped');
        })

      if ((action !== 'encode' && action !== 'decode') || (shift === false || !(Number.isInteger(shift)))) {
        const actionFlag = (action !== 'encode' && action !== 'decode');
        const actionFlagMessage = actionFlag ? 'Action is incorrect. ' : '';
        const shiftFlag = (shift === false || !(Number.isInteger(shift)));
        const shiftFlagMessage = shiftFlag ? 'Shift value is incorrect.' : '';
        const errorMessage = `${actionFlagMessage}${shiftFlagMessage}\n`;
        toTerminalError.write(errorMessage);
        process.exit(1);
      }
      streamFromFile.on('data', (chunk) => {
        chunk = ((typeof chunk === 'object') ? chunk.toString() : chunk);
        returnValue = cipher(returnObject, chunk);
        streamToFile.write(returnValue);
      });

    }
  })

} else {
  streamFromFile = (input === false) ? process.stdin : fs.createReadStream(input, 'utf8');
  streamToFile = (output === false) ? process.stdout : fs.createWriteStream(output, 'utf8');
  streamFromFile.on('error', (er) => {
    console.error('Source file. There is no file with stated address or access denied.');
    process.exit(1);
  });


  streamToFile
    .on('error', (er) => {
      console.error('File to write to. There is no file with stated address or access denied.');
      process.exit(1);
    })
    .on('pipe', () => {
      console.log('I\'m piped');
    })

  if ((action !== 'encode' && action !== 'decode') || (shift === false || !(Number.isInteger(shift)))) {
    const actionFlag = (action !== 'encode' && action !== 'decode');
    const actionFlagMessage = actionFlag ? 'Action is incorrect. ' : '';
    const shiftFlag = (shift === false || !(Number.isInteger(shift)));
    const shiftFlagMessage = shiftFlag ? 'Shift value is incorrect.' : '';
    const errorMessage = `${actionFlagMessage}${shiftFlagMessage}\n`;
    process.stderr.write(errorMessage);
    process.exit(1);
  }

  streamFromFile.on('data', (chunk) => {
    chunk = (typeof chunk === 'object') ? chunk.toString() : chunk;
    returnValue = cipher(returnObject, chunk);
    streamToFile.write(returnValue);
  });
}

