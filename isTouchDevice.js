import once from 'lodash-es/once';
import Bowser from "bowser";
const bowser = Bowser.parse(window.navigator.userAgent);


/**
 * Detect touch device.
 */
export const isTouchDevice = once(() => {
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0) ||
      bowser.platform.type !== 'desktop' ? true : false;
  }
)