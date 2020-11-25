

const alignTop = (scrollingElement, element, offsetTop) => {
  scrollingElement.scrollTop = element.offsetTop - offsetTop;
}

const alignBottom = (scrollingElement, element, offsetBottom) => {
  scrollingElement.scrollTop = element.offsetTop + element.offsetHeight + offsetBottom - scrollingElement.clientHeight;
}

const isFullVisible = (scrollElement, element, offsetTop, offsetBottom) => {
  const scrollElementRect = scrollElement.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  let scrollElementTop = scrollElementRect.top;
  let scrollElementBottom = scrollElementRect.bottom;

  //If given scrolling element as a document scroll
  //Document it-self hide from view-port, so this logic is written.
  if(document.scrollingElement === scrollElement) {
    scrollElementTop = 0;
    scrollElementBottom = window.visualViewport && window.visualViewport.height || window.innerHeight;
  }

  if (elementRect.top < (scrollElementTop + offsetTop) || elementRect.bottom > (scrollElementBottom - offsetBottom)) {
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
 * @param {Boolean} bottom When height of the element is greater than the view-port, whole element can't be accomodated 
 *   in the view-port. In this situation should the bottom of the element achored to the view-port bottom? `true` if you
 *   want to anchor bottom of the element anchored to the view-port bottom. `false` if top of the element anchored to
 *   the view-port top. Default `false`.
 * @param {Number} offsetTop top offset.
 * @param {Number} offsetBottom bottom offset.
 */
export const scrollIntoView = (scrollingElement, element, bottom = false, offsetTop = 0, offsetBottom = 0) => {
  if (isFullVisible(scrollingElement, element, offsetTop, offsetBottom)) {
    return;
  }

  // If element client height > view-port's height
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