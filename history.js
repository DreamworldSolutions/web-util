import lastIndexOf from "lodash-es/lastIndexOf";

let locationUpdatedCallback;
let fallbackCallback;
let internalURLCallback;
let transformURLCallback;

/**
 * Initializes routing flow.
 *
 * @param {Function} callback callback whenever the location is updated.
 */
export const init = (callback) => {
  locationUpdatedCallback = callback;
  internalURLCallback = defaultInternalURLCallback;
  transformURLCallback = defaultTransformURLCallback

  //Initially called location update callback handler.
  locationUpdatedCallback(window.location, null /* event */);

  //Listen on location change.
  window.addEventListener('location-changed', e => locationUpdatedCallback(window.location, e));
  window.addEventListener('popstate', e => locationUpdatedCallback(window.location, e));

  //Manage application internal link click.
  document.body.addEventListener('click', manageInternalLink);
};

/**
 * Use to register fallback function for `back` action.
 * Fallback callback is called when back action is perform and there is no any previous page is available
 *
 * @param {Function} callback fallback callback.
 */
export const registerFallbackCallback = (callback) => {
  fallbackCallback = callback;
};

/**
 * Use to register fallback function for to check url is internal url or not.
 * Default behaviour: considers every link from the current domain as an internal link.
 * You can override for specific use case like to consider your older app links as internal links too.
 *
 * @param {Function} callback
 */
export const registerInternalURLCallback = (callback) => {
  internalURLCallback = callback;
};

/**
 * Use to register fallback function for to transform url.
 * Default behaviour: doesn't do any transformation.
 * you need to specify your custom behaviour whene `InternalURL` is considering other domain URLs too.
 *
 * @param {Function} callback
 */
export const registerTransformURLCallback = (callback) => {
  transformURLCallback = callback;
};

/**
 * Navigate to given url.
 *
 * @param {String} url
 * @param {Object} options
 *  @property {Boolean} replace if true then change url via replaceState otherwise via pushState
 *  @property {String} title given url page title.
 *  @property {Boolean} autoBack if true then check given url in browser history and if find url then history back to url.
 */
export const navigate = (url, { replace, autoBack, title = "", state = {} }) => {
  if (!url) {
    console.warn("Router:navigate(): url is not provided");
    return;
  }

  if(autoBack) {
    const count = getBackCount(url);
    if(count) {
      go(-count);
      return;
    }
  }

  const historyState = getNewHistoryState(state, url, replace);
  if (replace) {
    window.history.replaceState(historyState, title, url);
  } else {
    window.history.pushState(historyState, title, url);
  }
  window.dispatchEvent(new Event('location-changed'));
};

/**
 * To move back one page use this method.
 * Browser history `back` api called.
 * Behaviour:
 *  - If current page is last page of application then called fallback handler.
 *  - Otherwise called history api `back` method.
 */
export const back = () => {
  const currentPageIndex = getCurrentPageIndex();
  if (!currentPageIndex && fallbackCallback) {
    fallbackCallback();
    return;
  }
  window.history.back();
};

/**
 * To move forward one page use this method.
 * Browser history `forward` api called.
 */
export const forward = () => {
  window.history.forward();
};

/**
 * @param {Number} count you can move forward 2 pages by passing 2 and move backward 2 pages by passing -2.
 * Browser history `go` api called.
 * Moving to a specific point in history.
 * Behaviour:
 *  - If `count` is `not a number` or `count` is `positive number` then called history `go` api called with count.
 *  - If `count` is  `negative` number then
 *    - If current page is appliction last page then called fallback callback.
 *    - If user backward is not possible then user backward to first page and called fallback callback.
 *  - Otherwise called history `go` api with count.
 */
export const go = (count) => {
  //If number is not valid OR positive number.
  if (!count || window.isNaN(count) || 0 < count) {
    window.history.go(count);
    return;
  }

  const currentPageIndex = getCurrentPageIndex();
  //If current page is last page of app.
  if (!currentPageIndex && fallbackCallback) {
    fallbackCallback();
    return;
  }

  //If history back is not possible
  if (currentPageIndex < Math.abs(count)) {
    window.addEventListener("popstate", fallbackCallback, { once: true });
    window.history.go(-currentPageIndex);
    return;
  }
  window.history.go(count);
};

/**
 * @returns {Number} Current page index from history current `state`.
 */
export const getCurrentPageIndex = () => {
  const currentState = window.history.state || {};
  return currentState.index || 0;
}

/**
 * @returns {Array} History from history current `state`.
 */
export const getHistoryList = () => {
  const historyState = window.history.state || {};
  return historyState.list && historyState.list.length !== 0 ? historyState.list: [getRelativeUrl(window.location.href)];
}

/**
 * @returns {Number} back count for given url.
 */
export const getBackCount = (url) => {
  if(!url) {
    return 0;
  }
  const historyList = getHistoryList();
  if(!historyList || historyList.length < 2) {
    return 0;
  }
  const urlIndex = lastIndexOf(historyList, getRelativeUrl(url));
  return urlIndex !== undefined ? (historyList.length - 1) - urlIndex: 0;
}

/**
 * @returns {String} relative url of given url.
 */
export const getRelativeUrl = (url) => {
  return url.replace(/^.*\/\/[^\/]+/, '');
}

/**
 * Manage Internal link.
 * Invoked when user click on document.
 * When clickable el is link and link is internal link then called location update callback handler called.
 */
const manageInternalLink = (e) => {
  if (e.defaultPrevented || e.button !== 0 ||
    e.metaKey || e.ctrlKey || e.shiftKey)
    return;
  const anchor = e.composedPath().filter(n => n.tagName === 'A')[0];
  if (!anchor || anchor.target ||
    anchor.hasAttribute('download') ||
    anchor.getAttribute('rel') === 'external')
    return;
  const href = anchor.href;
  if (!href || href.indexOf('mailto:') !== -1)
    return;
  const location = window.location;
  if(internalURLCallback(href)) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    const transformURL = transformURLCallback(href);
    if(transformURL !== location.href) {
      navigate(transformURL, {replace: false, title: '', state: {}});
    }
  }
}

/**
 * Default method of the to check interanl url or Not.
 * @param {String} url
 * @returns {Boolean} `true` when url is domain is same as current, `false` otherwise.
 */
const defaultInternalURLCallback = (url) => {
  const location = window.location;
  const origin = location.origin || location.protocol + '//' + location.host;
  return url.indexOf(origin) === 0;
}

/**
 * Default method to transform URL
 * @returns {String}
 */
const defaultTransformURLCallback = (url) => {
  return url;
}

const getNewHistoryState = (currentState = {}, url, replace) => {
  return {...currentState, index: getNewPageIndex(replace), list: getNewHistoryList(url, replace) };
}

const getNewPageIndex = (replace) => {
  const pageIndex = getCurrentPageIndex();
  if (replace) {
    return pageIndex;
  }
  return pageIndex ? pageIndex + 1 : 1;
}

const getNewHistoryList = (url, replace) => {
  let historyList = getHistoryList();
  if (replace) {
    historyList.splice(historyList.length - 1, 1, getRelativeUrl(url));
  } else {
    historyList.push(getRelativeUrl(url));
  }
  return historyList
}