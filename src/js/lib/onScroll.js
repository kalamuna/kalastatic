function onScroll() {
  var scroll,
      whenToShrink = 50,
      isShrunk;

  if ('pageYOffset' in window) {
    scroll = window.pageYOffset;
  } else {
    // IE8 and below.
    scroll = document.documentElement.scrollTop;
  }

  // If we are scrolled and the menu is collapsed, shrink the header.
  if(scroll > whenToShrink ){
    $('body').addClass('shrunk');
  } else {
    $('body').removeClass('shrunk');
  }

};

module.exports = onScroll;
