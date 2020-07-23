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

  var children = Array.from(html.children || []);
  var bRemoveChild = true;
  children.forEach(el => {
    if(bRemoveChild) {
      if(el.textContent.trim() === "") {
        html.removeChild(el);
      } else {
        bRemoveChild = false;
        trimStartTextNode(el);
      }
    }
  });

  return html;
}

const trimStartTextNode = (el) => {
  var trimStart = false;
  var childNodes = Array.from(el.childNodes || []);
  childNodes.forEach(child => {
    if(!trimStart) {
      if(!child.textContent || !child.textContent.trim() === "") {
        el.removeChild(child);
      } else {
        if(child.nodeType == Node.TEXT_NODE) {
          child.textContent = child.textContent.trimStart();
          trimStart = true;
        }
      }
    }
  });

  if(!trimStart && childNodes && childNodes[0]) {
    trimStartTextNode(childNodes[0]);
  }
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

  var children = Array.from(html.children || []).reverse();
  var bRemoveChild = true;
  bRemoveChild = true;
  children.forEach(el => {
    if(bRemoveChild) {
      if (el.textContent.trim() === "") {
        html.removeChild(el);
      } else {
        bRemoveChild = false;
        trimEndTextNode(el);
      }
    }
  });

  return html;
}

const trimEndTextNode = (el) => {
  //find first text nodes element and text content trim from start.
  var trimEnd = false;
  var childNodes = Array.from(el.childNodes || []).reverse();
  childNodes.forEach(child => {
    if(!trimEnd) {
      if(!child.textContent || !child.textContent.trim() === "") {
        el.removeChild(child);
      } else {
        if(child.nodeType == Node.TEXT_NODE) {
          child.textContent = child.textContent.trimEnd();
          trimEnd = true;
        }
      }
    }
  });

  //If text node is not found
  if(!trimEnd && childNodes && childNodes[0]) {
    trimEndTextNode(childNodes[0]);
  }
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