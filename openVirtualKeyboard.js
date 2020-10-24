
/**
 * Overview
 *  - This is utility to open virtual keyboard in mobile.
 * 
 * Usage pattern:
 *  - Import 
 *    - import { openVirtualKeyboard } from '@dreamworld/web-util.js'
 *  - Use
 *    - openVirtualKeyboard();
 *
 */

class OpenVirtualKeyboard {

  constructor() {
    const focusEl = document.querySelector('#dummy-input-for-virtual-keyboard');
    if (!focusEl) {
      let el = document.createElement('input');
      el.id = 'dummy-input-for-virtual-keyboard';
      document.body.appendChild(el);
      el.style.position = 'absolute';
      el.style.top = '-1000px';
    }
  }
 
  open() {
    const focusEl = document.querySelector('#dummy-input-for-virtual-keyboard');
    focusEl && focusEl.focus();
  }

}


export const openVirtualKeyboard = new OpenVirtualKeyboard().open;