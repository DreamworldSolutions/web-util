# @dreamworld/web-util

A collection of miscellaneous browser-focused ES Module utilities for DOM manipulation, device detection, scroll management, HTML trimming, history routing, and string operations.

---

## 1. User Guide

### Installation & Setup

Install via npm:

```bash
npm install @dreamworld/web-util
```

Or with yarn:

```bash
yarn add @dreamworld/web-util
```

The package is distributed as ES Modules only (`"type": "module"` in `package.json`). It requires a bundler or runtime that supports ES Module imports.

**Peer dependency:** `isTouchDevice` imports from `lit` (`isServer`). Ensure `lit` is available in your project when using that utility.

**Runtime dependencies** (installed automatically):
- `bowser` ^2.11.0 — browser/platform detection
- `lodash-es` ^4.17.21 — utility functions

---

### Basic Usage

The following utilities are available via the main entry point:

```js
import {
  openVirtualKeyboard,
  isTouchDevice,
  htmlToText,
  htmlTrim,
  htmlTrimStart,
  htmlTrimEnd
} from '@dreamworld/web-util';
```

All other utilities require a direct file import (see individual sections below).

---

### API Reference

---

#### `isTouchDevice`

Detects whether the current device is a touch device.

**Import**

```js
import { isTouchDevice } from '@dreamworld/web-util';
// or directly:
import { isTouchDevice } from '@dreamworld/web-util/isTouchDevice.js';
```

**Signature**

```js
isTouchDevice() => boolean
```

**Parameters:** None

**Returns:** `boolean` — `true` if the device supports touch input, `false` otherwise. Always returns `false` in server-side rendering (SSR) environments.

**Behavior:**
- Returns `false` immediately on SSR (via `lit`'s `isServer`).
- Returns `false` if Bowser detects `platform.type === 'desktop'`.
- Otherwise checks `ontouchstart in window`, `navigator.maxTouchPoints > 0`, or `navigator.msMaxTouchPoints > 0`.
- Result is memoized via `lodash-es/once` — evaluated only once per page load.

**Example**

```js
import { isTouchDevice } from '@dreamworld/web-util';

if (isTouchDevice()) {
  console.log('Touch input supported');
}
```

---

#### `openVirtualKeyboard`

Opens the virtual keyboard on mobile devices by temporarily focusing an offscreen input element.

**Import**

```js
import { openVirtualKeyboard } from '@dreamworld/web-util';
// or directly:
import { openVirtualKeyboard } from '@dreamworld/web-util/open-virtual-keyboard.js';
```

**Signature**

```js
openVirtualKeyboard() => void
```

**Parameters:** None

**Returns:** `void`

**Behavior:**
- Creates a hidden `<input>` element positioned at `top: -1000px` and appends it to `document.body`.
- Calls `.focus({ preventScroll: true })` on it, which triggers the virtual keyboard on iOS.
- Sets an internal `focused` flag to prevent duplicate invocations.
- Removes the input element 1000ms after it loses focus (`focusout` event).

**Use Case:**

On iOS, the virtual keyboard only opens if `.focus()` is called synchronously within a user click handler. When a dialog or page loads asynchronously after a button click, the auto-focused input inside that dialog won't open the keyboard. Calling `openVirtualKeyboard()` inside the click handler works around this limitation.

**Example**

```js
import { openVirtualKeyboard } from '@dreamworld/web-util';

button.addEventListener('click', () => {
  openVirtualKeyboard(); // call synchronously in click handler
  loadDialogAsync().then(() => {
    dialogInput.focus(); // virtual keyboard stays open
  });
});
```

---

#### `htmlToText`

Converts an HTML string to plain text by extracting `textContent`.

**Import**

```js
import { htmlToText } from '@dreamworld/web-util';
// or directly:
import { htmlToText } from '@dreamworld/web-util/htmlToText.js';
```

**Signature**

```js
htmlToText(html?: string, trim?: boolean) => string
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `html` | `string` | `""` | No | HTML string to convert to plain text |
| `trim` | `boolean` | `false` | No | If `true`, trims leading and trailing whitespace from the result |

**Returns:** `string` — The plain text content of the HTML.

**Example**

```js
import { htmlToText } from '@dreamworld/web-util';

htmlToText('<p>Hello <strong>world</strong></p>');
// => 'Hello world'

htmlToText('  <p>  Hello  </p>  ', true);
// => 'Hello'
```

---

#### `textToHtml`

Converts a template string into an HTML DOM node (`<div>` wrapping the parsed content).

**Import**

```js
import { textToHtml } from '@dreamworld/web-util/textToHtml.js';
// or default import:
import textToHtml from '@dreamworld/web-util/textToHtml.js';
```

> Not exported from `index.js`. Direct file import required.

**Signature**

```js
textToHtml(text: string) => HTMLDivElement
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `text` | `string` | — | Yes | HTML template string to parse |

**Returns:** `HTMLDivElement` — A `<div>` element with `innerHTML` set to the input string.

**Example**

```js
import textToHtml from '@dreamworld/web-util/textToHtml.js';

const node = textToHtml('<p>Hello</p>');
// => <div><p>Hello</p></div>
```

---

#### `htmlTrimStart`

Removes empty nodes from the beginning of an HTML structure and trims leading whitespace from the first non-empty text node.

**Import**

```js
import { htmlTrimStart } from '@dreamworld/web-util';
// or directly:
import { htmlTrimStart } from '@dreamworld/web-util/htmlTrim.js';
```

**Signature**

```js
htmlTrimStart(html: string | HTMLElement) => HTMLElement
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `html` | `string \| HTMLElement` | — | Yes | HTML string or DOM node to trim |

**Returns:** `HTMLElement` — The modified DOM node with empty leading nodes removed and the first non-empty text node's leading whitespace trimmed.

---

#### `htmlTrimEnd`

Removes empty nodes from the end of an HTML structure and trims trailing whitespace from the last non-empty text node.

**Import**

```js
import { htmlTrimEnd } from '@dreamworld/web-util';
// or directly:
import { htmlTrimEnd } from '@dreamworld/web-util/htmlTrim.js';
```

**Signature**

```js
htmlTrimEnd(html: string | HTMLElement) => HTMLElement
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `html` | `string \| HTMLElement` | — | Yes | HTML string or DOM node to trim |

**Returns:** `HTMLElement` — The modified DOM node with empty trailing nodes removed and the last non-empty text node's trailing whitespace trimmed.

---

#### `htmlTrim`

Removes empty nodes from both ends of an HTML structure and trims whitespace from the first and last non-empty text nodes. Combines `htmlTrimStart` and `htmlTrimEnd`.

**Import**

```js
import { htmlTrim } from '@dreamworld/web-util';
// or default import directly:
import htmlTrim from '@dreamworld/web-util/htmlTrim.js';
```

**Signature**

```js
htmlTrim(html: string | HTMLElement) => string
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `html` | `string \| HTMLElement` | — | Yes | HTML string or DOM node to trim |

**Returns:** `string` — The `innerHTML` of the trimmed DOM node, or `''` if the input is falsy or has no text content.

**Examples**

Remove all leading and trailing empty nodes:

```
Input:
  <div></div>
  <div></div>
  <div>hello</div>

Output:
  <div>hello</div>
```

Trim whitespace from first/last non-empty nodes:

```
Input:
  <div>   hello1     </div>
  <div></div>
  <div>   hello2     </div>

Output:
  <div>hello1     </div>
  <div></div>
  <div>   hello2</div>
```

Nested nodes with text:

```
Input:
  <div></div>
  <div>
    <div></div>
    <div>  hello1  </div>
    <div>  hello2  </div>
  </div>
  <div></div>

Output:
  <div>
    <div>hello1  </div>
    <div>  hello2</div>
  </div>
```

---

#### `replaceAll`

Replaces all occurrences of a substring in a string. Falls back to a lodash-based loop for browsers that do not support `String.prototype.replaceAll` natively.

**Import**

```js
import { replaceAll } from '@dreamworld/web-util/replaceAll.js';
// or default import:
import replaceAll from '@dreamworld/web-util/replaceAll.js';
```

> Not exported from `index.js`. Direct file import required.

**Signature**

```js
replaceAll(string: string, word: string, replacement: string) => string
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `string` | `string` | — | Yes | The string to modify |
| `word` | `string` | — | Yes | The substring to replace |
| `replacement` | `string` | — | Yes | The replacement string |

**Returns:** `string` — The modified string with all occurrences replaced.

**Behavior:**
- If the browser natively supports `String.prototype.replaceAll`, delegates to it.
- Otherwise, repeatedly applies `lodash-es/replace` in a loop until no further matches are found.

**Example**

```js
import replaceAll from '@dreamworld/web-util/replaceAll.js';

replaceAll('foo bar foo baz foo', 'foo', 'qux');
// => 'qux bar qux baz qux'
```

---

#### `scrollIntoView`

Scrolls a target element into the visible area of a scrolling container, with support for offset margins and oversized-element anchoring.

**Import**

```js
import { scrollIntoView } from '@dreamworld/web-util/scrollIntoView.js';
```

> Not exported from `index.js`. Direct file import required.

**Signature**

```js
scrollIntoView(
  scrollingElement: Element,
  element: Element,
  bottom?: boolean,
  offsetTop?: number,
  offsetBottom?: number
) => void
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `scrollingElement` | `Element` | — | Yes | The container element that scrolls (e.g. `document.scrollingElement`) |
| `element` | `Element` | — | Yes | The element to scroll into view |
| `bottom` | `boolean` | `false` | No | When the element is taller than the viewport: `true` anchors its bottom to the viewport bottom, `false` anchors its top to the viewport top |
| `offsetTop` | `number` | `0` | No | Top offset in pixels to apply after scrolling |
| `offsetBottom` | `number` | `0` | No | Bottom offset in pixels to apply after scrolling |

**Returns:** `void`

**Behavior:**
- Uses `IntersectionObserver` to check if the element is already ≥90% visible (`intersectionRatio > 0.9`). If so, does nothing.
- Uses `window.visualViewport.height` for the viewport height when `scrollingElement === document.scrollingElement` (mobile browser support).
- If the element is taller than the usable viewport (accounting for offsets), scrolls using the `bottom` parameter to decide anchoring.
- Otherwise, determines scroll direction from the element's current position and calls the native `element.scrollIntoView()`.
- After scrolling, adjusts `scrollingElement.scrollTop` by `offsetTop` or `offsetBottom`.
- Requires `IntersectionObserver` support (modern browsers).

**Example**

```js
import { scrollIntoView } from '@dreamworld/web-util/scrollIntoView.js';

const container = document.querySelector('.scroll-container');
const target = document.querySelector('#target-item');

scrollIntoView(container, target, false, 60, 0);
// Scrolls `target` into view within `container`, leaving 60px top margin.
```

---

#### `isElementVisible` (default export)

Checks if a given element is fully visible within a scrolling container using `IntersectionObserver`.

**Import**

```js
import isElementVisible from '@dreamworld/web-util/is-element-visible.js';
```

> Not exported from `index.js`. Direct file import required. The export is an anonymous default function.

**Signature**

```js
(element: Element, scrollingElement?: Element) => Promise<boolean>
```

**Parameters**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `element` | `Element` | — | Yes | The element to check for visibility |
| `scrollingElement` | `Element` | `document.scrollingElement` | No | The scrolling container to check within |

**Returns:** `Promise<boolean>` — Resolves to `true` if the element is 100% visible (`threshold: 1`), `false` otherwise. The observer disconnects after the first observation.

**Example**

```js
import isElementVisible from '@dreamworld/web-util/is-element-visible.js';

const visible = await isElementVisible(document.querySelector('#my-element'));
console.log(visible); // true or false
```

---

#### `history` — Browser History Management

A wrapper around the Browser History API (`pushState`, `replaceState`, `back`, `forward`, `go`) with application-level routing features: internal link interception, fallback callbacks, URL transformation, and auto-back navigation.

**Import**

```js
import {
  init,
  registerFallbackCallback,
  registerInternalURLCallback,
  registerTransformURLCallback,
  navigate,
  back,
  forward,
  go,
  getCurrentPageIndex,
  getHistoryList,
  getBackCount,
  getRelativeUrl
} from '@dreamworld/web-util/history.js';
```

> Not exported from `index.js`. Direct file import required.

---

##### Functions

| Name | Signature | Returns | Description |
|---|---|---|---|
| `init` | `(callback: Function) => void` | `void` | Initializes the routing system. Calls `callback(window.location, event)` on every location change. Also intercepts internal `<a>` clicks on `document.body`. Must be called once at app startup. |
| `registerFallbackCallback` | `(callback: Function) => void` | `void` | Registers a callback invoked when `back()` or `go()` is called with no previous page available in app history. |
| `registerInternalURLCallback` | `(callback: Function) => void` | `void` | Overrides the default internal URL check. Default: URL starts with `window.location.origin`. |
| `registerTransformURLCallback` | `(callback: Function) => void` | `void` | Overrides URL transformation before navigation. Default: returns URL unchanged. |
| `navigate` | `(url: string, options: object) => void` | `void` | Navigates to the given URL. See options table below. |
| `back` | `() => void` | `void` | Navigates back one page. Calls `fallbackCallback` if no previous page exists. |
| `forward` | `() => void` | `void` | Navigates forward one page via `window.history.forward()`. |
| `go` | `(count: number) => void` | `void` | Navigates `count` steps. Negative = backward. Calls `fallbackCallback` when at the first page or when the requested back count exceeds available history depth. |
| `getCurrentPageIndex` | `() => number` | `number` | Returns the current page index from `window.history.state.index`, or `0` if unset. |
| `getHistoryList` | `() => string[]` | `string[]` | Returns the array of visited relative URLs from `window.history.state.list`. |
| `getBackCount` | `(url: string, autoBackCount: number) => number` | `number` | Returns the number of steps back to reach the given URL in history. Returns `0` if not found or count exceeds `autoBackCount`. |
| `getRelativeUrl` | `(url: string) => string` | `string` | Strips the protocol + host from a URL and returns the relative path. |

##### `navigate` Options

| Option | Type | Default | Required | Description |
|---|---|---|---|---|
| `replace` | `boolean` | — | No | If `true`, uses `replaceState` instead of `pushState` |
| `autoBack` | `boolean` | — | No | If `true`, checks if the URL exists in history and navigates back to it instead of pushing |
| `autoBackCount` | `number` | — | No | Limits how many steps back `autoBack` will search |
| `title` | `string` | `""` | No | Page title passed to the history API |
| `state` | `object` | `{}` | No | Additional state object merged into the history state |

**History State Shape** (stored in `window.history.state`):

```js
{
  index: number,   // current page index (0 = first page)
  list: string[]   // array of relative URLs visited
}
```

**Example**

```js
import { init, navigate, back, registerFallbackCallback } from '@dreamworld/web-util/history.js';

// Initialize once at startup
init((location, event) => {
  console.log('Location changed:', location.pathname);
});

// Register fallback for when there's no previous page
registerFallbackCallback(() => {
  navigate('/', { replace: true });
});

// Navigate to a new page
navigate('/dashboard', { title: 'Dashboard' });

// Navigate back, using auto-back if URL is in history
navigate('/home', { autoBack: true, autoBackCount: 5 });

// Go back one page
back();
```

---

#### `uri-esm.js` — URI Parsing (URI.js v1.19.1)

A bundled, minified copy of [URI.js](https://medialize.github.io/URI.js/) (v1.19.1 by Medialize) wrapped for ES Module compatibility. Provides comprehensive RFC-compliant URI parsing, manipulation, and templating.

**Import**

```js
import URI from '@dreamworld/web-util/uri-esm.js';
```

> Not re-exported from `index.js`. Direct file import required. Refer to the [URI.js documentation](https://medialize.github.io/URI.js/) for the full API.

---

### Configuration Options

There are no global constants or environment variables defined in the source. The `history` module accepts runtime configuration via its `register*` callback functions (see above).

---

### Advanced Usage

#### Combining `scrollIntoView` and `isElementVisible`

```js
import isElementVisible from '@dreamworld/web-util/is-element-visible.js';
import { scrollIntoView } from '@dreamworld/web-util/scrollIntoView.js';

const container = document.scrollingElement;
const target = document.querySelector('#item');

const visible = await isElementVisible(target);
if (!visible) {
  scrollIntoView(container, target, false, 80, 0);
}
```

#### History with custom URL transformation

```js
import {
  init,
  registerInternalURLCallback,
  registerTransformURLCallback,
  navigate
} from '@dreamworld/web-util/history.js';

init((location) => renderRoute(location.pathname));

// Treat both domains as internal
registerInternalURLCallback((url) =>
  url.startsWith('https://app.example.com') || url.startsWith('https://legacy.example.com')
);

// Redirect legacy domain links to new domain
registerTransformURLCallback((url) =>
  url.replace('https://legacy.example.com', 'https://app.example.com')
);

navigate('https://legacy.example.com/about', {});
// => navigates to https://app.example.com/about
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

| Pattern | Where Used |
|---|---|
| **Memoization (Once)** | `isTouchDevice` — result computed once and cached via `lodash-es/once` |
| **Promise + IntersectionObserver** | `isElementVisible`, `scrollIntoView` — async visibility detection without polling |
| **Side-effect-on-init** | `history.init()` — registers global event listeners (`location-changed`, `popstate`, `click`) on call |
| **Callback Registry** | `history` module — `registerFallbackCallback`, `registerInternalURLCallback`, `registerTransformURLCallback` follow a registry/strategy pattern for extensible behavior |
| **DOM Manipulation** | `openVirtualKeyboard`, `htmlToText`, `textToHtml`, `htmlTrim*` — all create ephemeral DOM nodes in-memory for parsing/transformation without rendering to page |
| **Graceful Degradation** | `replaceAll` — uses native API when available, falls back to lodash loop for older browsers |
| **SSR Guard** | `isTouchDevice` — checks `lit`'s `isServer` before accessing `window` globals |

### Module Responsibilities

| Module | Responsibility |
|---|---|
| `isTouchDevice.js` | Device capability detection |
| `open-virtual-keyboard.js` | iOS virtual keyboard workaround |
| `htmlToText.js` | HTML → plain text conversion |
| `textToHtml.js` | HTML string → DOM node conversion (used internally by `htmlTrim.js`) |
| `htmlTrim.js` | Structural HTML whitespace/empty-node trimming |
| `replaceAll.js` | Cross-browser string replacement |
| `scrollIntoView.js` | Smart scroll-into-view with offset and oversized-element support |
| `is-element-visible.js` | One-shot async element visibility check |
| `history.js` | SPA routing layer over the Browser History API |
| `uri-esm.js` | Vendored URI parsing library (URI.js v1.19.1) |
