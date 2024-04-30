/**
 * Checks if a given element is fully visible within the viewport or a specified scrolling element.
 *
 * @param {Element} element The element to check for visibility.
 * @param {Element} [scrollingElement=document.scrollingElement] The scrolling element to consider (defaults to document.scrollingElement).
 * @returns {Promise<boolean>} A promise that resolves to true if the element is fully visible, false otherwise.
 */
 export default (element, scrollingElement = document.scrollingElement) => {
    return new Promise((resolve) => {
      const root = document.scrollingElement === scrollingElement ? null : scrollingElement;
      const options = { root, threshold: 1 }; // Only check for full visibility (threshold: 1)
  
      const io = new IntersectionObserver((entries) => {
        const entry = entries[0]; // Access the first entry (assuming single element check)
        const visible = entry?.isIntersecting; // Optional chaining for modern browsers
        resolve(visible);
        io.disconnect(); // Disconnect after first entry
      }, options);
  
      io.observe(element);
    });
  };