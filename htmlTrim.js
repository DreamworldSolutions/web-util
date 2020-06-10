import textToHtml from './textToHtml';

/**
 * Remove empty nodes from given html as an argument. 
 * @param {*} html The template string OR The template node
 * @param {Boolean} deep Deeply remove the empty child or not.
 */
const removeEmptyNodes = (html, deep) => {
  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  let children = Array.from(html.children || []);
  children.forEach(el => {
    if (el.textContent.trim() === "") {
      html.removeChild(el)
    } else {
      if (deep && el && el.children && el.children.length > 0) {
        removeEmptyNodes(el, deep);
      }
    }
  });

  return html;
}

/**
 * Remove empty nodes from given html as an argument. 
 * @param {*} html The template string OR The template node
 * @param {Boolean} deep Deeply remove the empty child or not.
 */
export const htmlTrim = (html, deep) => {
  if (!html) {
    return '';
  }

  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  if (!html || !html.textContent) {
    return '';
  }
  html = removeEmptyNodes(html, deep);
  return html.innerHTML;
}

export default htmlTrim;