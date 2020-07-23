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
      bRemoveChild = false;

      //find first text nodes element and text content trim from start.
      let trimStart = false;
      let childNodes = Array.from(el.childNodes || []);
      childNodes.forEach(el => {
        if(!trimStart && el.nodeType == Node.TEXT_NODE && el.textContent && el.textContent.trim()) {
          el.textContent = el.textContent.trimStart();
          trimStart = true;
        }
      });

      //If text node is not found
      if(!trimStart) {
        el = htmlTrimStart(el);
      }
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
      html.removeChild(el);
    } else {
      bRemoveChild = false;

      //find first text nodes element and text content trim from start.
      let trimEnd = false;
      let childNodes = Array.from(el.childNodes || []).reverse();
      childNodes.forEach(el => {
        if(!trimEnd && el.nodeType == Node.TEXT_NODE && el.textContent && el.textContent.trim()) {
          el.textContent = el.textContent.trimEnd();
          trimEnd = true;
        }
      });

      //If text node is not found
      if(!trimEnd) {
        el = htmlTrimEnd(el);
      }
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

  //String convert into html.
  if (typeof html === 'string') {
    html = textToHtml(html);
  }

  //If html text content is empty
  if (!html || !html.textContent) {
    return '';
  }
  html = htmlTrimStart(html);
  html = htmlTrimEnd(html);
  return html.innerHTML;
}

export default htmlTrim;