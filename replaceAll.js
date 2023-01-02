import replace from 'lodash-es/replace';

/**
 * Why is it needed?: There is no support of replaceAll method in old browsers,
 *                    so it is its wrapper method which if browser's replaceAll method is available,
 *                    it will use it, otherwise it will replace with custom logic using lodash's replace method.
 *
 * Replaces matches for pattern in string with replacement.
 * @param {String} string The string to modify.
 * @param {String} word The pattern to replace.
 * @param {String} replacement The match replacement.
 * @returns {String} Returns the modified string.
 */
export const replaceAll = (string, word, replacement) => {
  const browserReplaceAllFeature = ''.replaceAll && typeof ''.replaceAll == 'function';
  if(browserReplaceAllFeature){
    return string.replaceAll(word, replacement);
  }

  let resultText;
  while(true) {
    resultText = replace(string, word, replacement);
    if (resultText === text) {
      break;
    }
    text = resultText;
  }
  return resultText;
}

export default replaceAll;