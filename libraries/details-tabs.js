// Accessible Details Tabs by Mike McCaffrey
// https://codepen.io/mikemccaffrey/pen/mdGgJZm


// Set a flag so the css knows that it is safe to put the items into a tab grid.
document.querySelectorAll('.details-tabs').forEach((tabs) => {
  tabs.setAttribute('data-javascript-enabled', 'true');
});

// When in a tab layout, ensure that one tab is open at a time.
document.querySelectorAll('.details-tabs details summary').forEach((tab) => {
  tab.addEventListener("click", (event) => {

    // Only manage the open state of the details elements if being displayed as tabs.
    if (getComputedStyle(tab.closest('.details-tabs')).display == 'grid') {

      // When opening a details tab, close any adjacent tabs.
      for (const child of tab.closest('.details-tabs').children) {
        if (child !== tab.closest('details')) {
          child.removeAttribute('open');
        }
      }

      // If this is a mouseclick on the active tab, keep it from closing.
      if (tab.closest('details').getAttribute('open') !== null && event.clientX > 0) {
        event.preventDefault();
      }
    }
  });
});

// Allow users to use their keyboard arrows to switch between tabs.
document.querySelectorAll('.details-tabs details').forEach((tab) => {
  tab.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
      if (sibling = tab.nextElementSibling) {
        if (siblingSummary = sibling.querySelector('summary')) {
          siblingSummary.click();
          siblingSummary.focus();
        }
      }
    }
    if (event.keyCode == 37) {
      if (sibling = tab.previousElementSibling) {
        if (siblingSummary = sibling.querySelector('summary')) {
          siblingSummary.click();
          siblingSummary.focus();
        }
      }
    }
  });
});

// Check the number of open tabs and the summary heights on window resize.
window.addEventListener("resize",(event) => {
  document.querySelectorAll('.details-tabs').forEach((tabs) => {

    // If switching from mobile, make sure one and only one tab is open.
    if (getComputedStyle(tabs).display == 'grid') {
      let openTabs = tabs.querySelectorAll('details[open]');
      if (openTabs.length > 1) {
        for (let i = 1; i < openTabs.length; i++) {
          openTabs[i].removeAttribute('open');
        }
      }
      if (openTabs.length == 0) {
        tabs.querySelector('details').setAttribute('open', '');
      }
    }

    // If in tabs layout, make sure that all tabs are the same height.
    let tallestTab = 0;
    tabs.querySelectorAll('details summary').forEach((tabSummary) => {
      tabSummary.style.minHeight = 0;
      if (tabSummary.clientHeight > tallestTab) {
        tallestTab = tabSummary.clientHeight;
      }
    });
    if (getComputedStyle(tabs).display == 'grid') {
      tabs.querySelectorAll('details summary').forEach((tabSummary) => {
        tabSummary.style.minHeight = tallestTab + 'px';
      });
    }
  });
});

// On page load, check number of open tabs and the summary heights.
window.dispatchEvent(new Event('resize'));
