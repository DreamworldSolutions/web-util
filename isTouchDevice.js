import once from 'lodash-es/once.js';
import Bowser from "bowser";
import {isServer} from 'lit';

let bowser;
if(!isServer){
  bowser = Bowser.parse(window.navigator.userAgent);
}

/**
 * Detect touch device.
 */
export const isTouchDevice = once(
  () => {
    if(isServer){
      return false;
    }

    if (bowser.platform.type === 'desktop') {
      return false;
    }
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0) ? true : false;
  }
)