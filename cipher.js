export default function (shift, text) {
  const originalAlphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const originalAlphabetArray = originalAlphabetString.split('');
  const alphabetLength = originalAlphabetArray.length;
  const normaliseShift = Math.abs(shift) > alphabetLength ? shift % alphabetLength : shift;
  const firstChunk = originalAlphabetString.slice(normaliseShift);
  const secondChunk = originalAlphabetString.slice(0, normaliseShift);
  const cipheredAlphabetString = firstChunk + secondChunk;
  const cipheredAlphabetArray = cipheredAlphabetString.split('');
  const cipheredAlphabetLength = cipheredAlphabetArray.length;
  // console.log(originalAlphabetString);
  // console.log(`original alphabet length: ${alphabetLength}`);
  // console.log(`shift: ${shift}`);
  // console.log(cipheredAlphabetString);
  // console.log(`ciph_A_L: ${cipheredAlphabetLength}`);

  const returnData = text.split('').map((i) => {
    if (i === ' ' || (!originalAlphabetArray.includes(i))) {
      return i;
    }

    return cipheredAlphabetArray[originalAlphabetArray.indexOf(i)];
  }).join('');
  // console.log(text);
  // console.log(returnData);
  // console.log(text === returnData);
  return returnData;
}