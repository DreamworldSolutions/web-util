/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} text The template string
 * @return {Node}       The template HTML
 */
export const textToHtml = (text) => {
  var dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
}

export default textToHtml;