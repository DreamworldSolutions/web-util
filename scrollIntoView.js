

const alignTop = (scrollingElement, element, offsetTop) => {
  scrollingElement.scrollTop = element.offsetTop - offsetTop;
}

const alignBottom = (scrollingElement, element, offsetBottom) => {
  scrollingElement.scrollTop = element.offsetTop + element.offsetHeight + offsetBottom - scrollingElement.clientHeight;
}

const isFullVisible = (scrollElement, element, offsetTop, offsetBottom) => {
  const scrollElementRect = scrollElement.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  if (elementRect.top < (scrollElementRect.top + offsetTop) || elementRect.bottom > (scrollElementRect.bottom - offsetBottom)) {
    return false;
  }

  return true;
}

/**
 * If `element` visible fully, do nothing
 * When size of element is greater than scrollingElement, scroll based on `bottom` value.
 * Otherwise, scroll based on element position.
 * @param {Object} scrollintElement Scrolling Element
 * @param {Object} Element Element to be scroll into viewport
 * @param {Boolean} bottom If height of `Element` is greater than `ScrollingElement` & sets to `true`, align `Element` at bottom.
 * @param {Number} offsetTop top offset.
 * @param {Number} offsetBottom bottom offset.
 */
export const scrollIntoView = (scrollingElement, element, bottom = false, offsetTop = 0, offsetBottom = 0) => {
  if (isFullVisible(scrollingElement, element, offsetTop, offsetBottom)) {
    return;
  }

  // If element client height > scrolling element client hight.
  if (element.clientHeight > (scrollingElement.clientHeight - (offsetTop + offsetBottom))) {
    if (!bottom) {
      alignTop(scrollingElement, element, offsetTop);
    } else {
      alignBottom(scrollingElement, element, offsetBottom);
    }
    return;
  }

  if (element.offsetTop < (scrollingElement.scrollTop + offsetTop)) {
    alignTop(scrollingElement, element, offsetTop);
  }
  
  if((element.offsetTop + element.offsetHeight) > (scrollingElement.scrollTop + scrollingElement.clientHeight - offsetBottom)) {
    alignBottom(scrollingElement, element, offsetBottom);
  }
}