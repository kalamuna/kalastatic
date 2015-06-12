var $ = require('jquery');

$(function() {
	// Event.
  $(document).scroll(require('utils/onScroll').bind(this));

  // Other things
  console.log("Hello!");
});
