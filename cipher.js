export default function ({ shift, action, output, input }, text) {
  const originalAlphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const originalAlphabetArray = originalAlphabetString.split('');
  const alphabetLength = originalAlphabetArray.length;
  const normaliseShiftBeforeAction = Math.abs(shift) > alphabetLength ? shift % alphabetLength : shift;
  const normaliseShift = action === 'encode' ? normaliseShiftBeforeAction : 26 - normaliseShiftBeforeAction;
  const firstChunk = originalAlphabetString.slice(normaliseShift);
  const secondChunk = originalAlphabetString.slice(0, normaliseShift);
  const cipheredAlphabetString = firstChunk + secondChunk;
  const cipheredAlphabetArray = cipheredAlphabetString.split('');
  const cipheredAlphabetLength = cipheredAlphabetArray.length;
  const returnData = text.split('').map((i) => {
    if (i === ' ' || (!originalAlphabetArray.includes(i.toUpperCase()))) {
      return i;
    } else {
      if (i === i.toUpperCase()) {
        return cipheredAlphabetArray[originalAlphabetArray.indexOf(i.toUpperCase())];
      }
      return (cipheredAlphabetArray[originalAlphabetArray.indexOf(i.toUpperCase())]).toLowerCase();
    }
  }).join('');
  return returnData;
}