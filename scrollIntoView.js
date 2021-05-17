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
  
   const intersectionCallback = (entries) => {
    intersectionInstance && intersectionInstance.disconnect();
    intersectionInstance = null;

    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.9) {
        return;
      } else {
        let scrollingElementClientHeight = document.scrollingElement === scrollingElement && window.visualViewport ? window.visualViewport.height : scrollingElement.clientHeight;
        // If element client height > view-port's height
        if (element.clientHeight > (scrollingElementClientHeight - (offsetTop + offsetBottom))) {
          _scrollIntoView(scrollingElement, element, bottom, offsetTop, offsetBottom);
          return
        }
        const scrollingElementTop = document.scrollingElement !== scrollingElement ? scrollingElement.getBoundingClientRect().top : 0;
        const elementTop = entry.boundingClientRect.top;

        if (elementTop > (scrollingElementTop + offsetTop)) {
          _scrollIntoView(scrollingElement, element, true, offsetTop, offsetBottom);
        } else {
          _scrollIntoView(scrollingElement, element, false, offsetTop, offsetBottom);
        }
      }
    });
  }

  const root = document.scrollingElement === scrollingElement ? null : scrollingElement;
  let intersectionInstance = new IntersectionObserver(intersectionCallback, { root, rootMargin: `-${offsetTop}px 0px -${offsetBottom}px 0px` });
  intersectionInstance.observe(element);
}

const _scrollIntoView = (scrollingElement, element, bottom, offsetTop, offsetBottom) => {
  element.scrollIntoView(!bottom);
  if (!bottom) {
    if (offsetTop) {
      scrollingElement.scrollTop -= offsetTop;
    }
  } else {
    if (offsetBottom) {
      scrollingElement.scrollTop += offsetBottom;
    }
  }
}