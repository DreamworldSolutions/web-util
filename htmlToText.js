
/**
 * Converts html text into plain text.
 * @param {String} html HTML Content
 */
export const htmlToText = (html = "", trim = false) => {
  let d = document.createElement('div');
  d.innerHTML = html;
  if (trim) {
    return d.textContent.trim();
  }
  return d.textContent;
}