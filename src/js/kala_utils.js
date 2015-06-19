;(function( kala, window, $ ){

  /**
  * Feature detection for whether were in a mobile browser or not.
  * @static
  * @example
  * if( kala.isMobile() ) {
  *   $("#myElement").on('touchstart', function(){ doSomething() });
  * }
  */
  kala.isMobile = function(){
    var hasTouchStart = ('ontouchstart' in document.documentElement),
        hasOrientation = kala.hasOrientation();
    return ( hasTouchStart && hasOrientation );
  };

  /**
  * Feature detection for whether the browser has orientation.
  * @static
  */
  kala.hasOrientation = function(){

    return (
      typeof window.orientation !== 'undefined' ||
      typeof window.orientationchange !== 'undefined' ||
      typeof window.onorientationchange !== 'undefined' ||
      typeof window.DeviceOrientationEvent == 'function' ||
      typeof window.deviceorientation !== 'undefined' ||
      typeof window.MozOrientation !== 'undefined' ||
      typeof Screen.orientation !== 'undefined'
    ) ? true : false;

  };

  /**
  * Simple utility method for copying keys from one object to another
  * @static
  * @example
  * someNamespace.options = {
  *  a: "a",
  *  b: "b"
  * }
  * someNamespace.SomeClassContructor = function( $jqEl, opts ) {
  *   this.options = kala.shallowMerge( this.options, opts );
  * }
  * var anInstanceOfClass = new someNamespace.SomeClassConstructor( $("#anEl", { b: "c" }));
  */
  kala.shallowMerge = function( destObj, sourceObj ){
    for( var key in sourceObj ) {
      destObj[key] = sourceObj[key];
    }
    return destObj;
  };

  /**
  * Sets url hash according to deeplinks
  * If a link's href matches the urlHash then we fire the click event.
  * @static
  * @example
  * kala.deeplinks( "#primary-nav", "li a");
  * @todo implement https://github.com/medialize/URI.js
  */
  kala.deeplinks = function(containerSelector,linkSelector){

    var container = $(containerSelector),
        urlHash = document.location.hash;

    if (urlHash) {
      var link = container.find( linkSelector+'[href$='+urlHash+']')
      if( link.length > 0 ) {
        link.click();
      }
    }

    container.find(linkSelector).on('click', function(e){
      // console.log( e, e.currentTarget );
      window.location.hash = e.currentTarget.hash;
    });

  }


  /**
  * Sets url hash according to deeplinks
  * And triggers the active tab (in a bootstrap tab group) if it's tabs's href matches the urlHash then we fire the click event.
  * @static
  * @example
  * kala.deepTabs( "#a-tab-group", "a");
  * @todo implement https://github.com/medialize/URI.js
  */
  kala.deeplinkTabs = function(tabGroupSelector){

    var tabGroup = $(tabGroupSelector),
        urlHash = document.location.hash;

    if (urlHash) {
      var tab = tabGroup.find('a[href$='+urlHash+']');
      if( tab.length > 0 ) {
        tab.tab('show') ;
      }
    }

    // Change hash for page-reload
    tabGroup.find('a').on('show.bs.tab', function (e) {
      window.location.hash = e.target.hash;
    });

  };

}( window.kala = window.kala || {}, window, jQuery ));
