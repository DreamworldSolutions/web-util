import textToHtml from './textToHtml';

/**
 * Removes empty nodes/html from the beginning of a given html template.
 * Removes whitespace from beginning of a first non-empty nodes/html.
 * @param {*} html The template string OR The template node
 * @returns {html} html stripped of empty nodes from beginning.
 */
export const htmlTrimStart = (html) => {
  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  let children = Array.from(html.children || []);
  let bRemoveChild = true;
  children.forEach(el => {
    if (bRemoveChild && el.textContent.trim() === "") {
      html.removeChild(el)
    } else {
      el.textContent = el.textContent.trimStart();
      bRemoveChild = false;
    }
  });

  return html;
}

/**
 * Removes empty nodes/html from the end of a given html template. 
 * Removes whitespace from end of a last non-empty nodes/html.
 * @param {*} html The template string OR The template node
 * @returns {html} html stripped of empty nodes from end.
 */
export const htmlTrimEnd = (html) => {
  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  let children = Array.from(html.children || []).reverse();
  let bRemoveChild = true;
  bRemoveChild = true;
  children.forEach(el => {
    if (bRemoveChild && el.textContent.trim() === "") {
      html.removeChild(el)
    } else {
      el.textContent = el.textContent.trimEnd();
      bRemoveChild = false;
    }
  });

  return html;
}

/**
 * Removes empty nodes/html from the both side of a given html template. 
 * @param {*} html The template string OR The template node.
 * @returns {html} html stripped of empty nodes from both ends.
 */
export const htmlTrim = (html) => {
  if (!html) {
    return '';
  }

  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  if (!html || !html.textContent) {
    return '';
  }
  html = htmlTrimStart(html);
  html = htmlTrimEnd(html);
  return html.innerHTML;
}

export default htmlTrim;