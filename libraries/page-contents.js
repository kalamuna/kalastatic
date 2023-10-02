// Creates a table of contents based on the headings on a page.

let currentLevel = 1;
let output = "<h2>Contents</h2>";

// Get all of the headings in the main content of a page.
document.querySelectorAll('main h2, main h3, main h4, main h5, main h6').forEach((heading) => {

  // Make sure this heading isn't in a section that should be excluded from the page structure.
  if (!heading.closest('[data-page-contents-exclude="true"]')) {
    let thisLevel = heading.tagName.substring(1);
    while (thisLevel > currentLevel) {
      output += '<ul>';
      currentLevel++;
    }
    while (thisLevel < currentLevel) {
      output += '</ul>';
      currentLevel--;
    }

    // Get the id attribute of the heading to use as the anchor to jump to.
    let anchor = heading.getAttribute('id');

    // If there is no achor, try to create one and add it to the heading if needed.
    if (!anchor) {
      anchor = heading.textContent.toLowerCase().replace(/[ ]+/gm, '-').replace(/[^a-z0-9-]/gm, '');
      // Make sure another element does not already have this id.
      if (!document.querySelectorAll('[id="' + anchor + '"]').length) {
        heading.setAttribute('id', anchor);
      }
    }

    // Output a link to the anchor with the header text.
    output += '<li><a href="#' + anchor + '">' + heading.textContent + '</a></li>';
  }
});

// End any remaining lists.
while (currentLevel > 1) {
  output += '</ul>';
  currentLevel--;
}

// Place the tree into the page element that has been provided with a page-contents id.
document.querySelectorAll('#page-contents').forEach((section) => {
  section.insertAdjacentHTML('beforeend',output);
});
