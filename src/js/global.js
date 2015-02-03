(function( kalaStatic, window, $, kala ){

  // For things that run global (on all the pages)
  kalaStatic.Site = function() {

    if (kala.isMobile()) {} else {}

    // $('#main-nav').on('show.bs.collapse', function(){
    //   $('#header').addClass('open');
    // });

    // $('#main-nav').on('hidden.bs.collapse', function(){
    //   $('#header').removeClass('open');
    // });

    var self = this;
    $(document).scroll( this.onScroll.bind(this) );

  }

  p = kalaStatic.Site.prototype;
  p.contructor = kalaStatic.Site;

  p.onScroll = function(){

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

  }

  // things that happen on all the pages....
  kalaStatic.site = new kalaStatic.Site();


}( window.kalaStatic = window.kalaStatic || {}, window, jQuery, window.kala ));
