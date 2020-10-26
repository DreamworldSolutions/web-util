
/**
 * ## Overview
 * 
 * Used to open Virtual Keyboard on Mobile Device. 
 * It's really needed only on the iOS device in the following scenario:
 * On click of a button on the page, we want to open a Dialog or another Page and 
 * focus should be put into one of the field on that page/dialog. And that Page/Dialog
 * is a separate fragment so it's ES Module is loaded after the user click on the button.
 * 
 * In such situation, Dialog/Page is mostly configured to auto-focus to the specific input
 * on it. But, here focus will be in the input but virtual keyboard won't popup. iOS doesn't
 * open the virtual keyboard if `.focus()` method is not invoked from the same method which
 * handled the Click event.
 * 
 * Usage:
 * - Invoke this method from the Click Handler function.
 * ```js
 * import { openVirtualKeyboard } from '@dreamworld/web-util.js';
 * openVirtualKeyboard();
 * ```
 * - And later on, you can grab focus to your input (on the dialog/page) when it's ready.
 * 
 * 
 * How does this work?
 * - When you invoke the `openVirtualKeyboard` method, 
 *    - it creates an offscreen (invisible) `input`.
 *    - it actually puts focus into that input. So, Virtual keyboard popsup.
 * - This offscreen input is then removed when it looses the focus.
 * 
 */

 //let log = loglevel.getLogger("web-util"); //TODO:

let log = window.console;
let focused = false;

const createInput = () => {
  let elInput = document.createElement('input');
  elInput.id = 'dummy-input-for-virtual-keyboard';
  document.body.appendChild(elInput);
  elInput.style.position = 'absolute';
  elInput.style.top = '-1000px';
  return elInput;
}

const openVirtualKeyboard = () => {
  if(focused) {
    log.debug("already focused");
    return;
  }

  let elInput = createInput();
  elInput.focus();
  focused = true;
  log.debug("focused");

  elInput.addEventListener('focusout', ()=>{
    focused = false;
    og.debug("focusout");

    window.setTimeout(()=>{
      elInput.remove();
      log.debug("input destroyed");
    }, 1000);
  });
}

export default openVirtualKeyboard;