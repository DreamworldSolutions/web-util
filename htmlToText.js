
/**
 * Converts html text into plain text.
 * @param {String} html HTML Content
 */
export const htmlToText = (html) => {
  let d = document.getElementById('dwHtml2TextConverter')
  if (!d) {
    d = document.createElement('div');
    d.id = 'dwHtml2TextConverter';
  }
  d.innerHTML = html;
  return d.textContent;
}