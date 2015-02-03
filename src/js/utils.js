(function( kala, window, $ ){

  kala.isMobile = function(){
    var hasTouchStart = ('ontouchstart' in document.documentElement),
        hasOrientation = kala.hasOrientation();
    return ( hasTouchStart && hasOrientation );
  };

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

  kala.shallowMerge = function( destObj, sourceObj ){
    for( var key in sourceObj ) {
      destObj[key] = sourceObj[key];
    }
    return destObj;
  };

  kala.deeplinks = function(containerSelector,linkSelector){

    var container = $(containerSelector),
        urlHash = document.location.hash;

    if (urlHash) {
      var link = container.find( linkSelector+'[href='+urlHash+']')
      if( link.length > 0 ) {
        link.click();
      }
    }

    container.find(linkSelector).on('click', function(e){
      // console.log( e, e.currentTarget );
      window.location.hash = e.currentTarget.hash;
    });

  }

  kala.deeplinkTabs = function(tabGroupSelector){

    var tabGroup = $(tabGroupSelector),
        urlHash = document.location.hash;

    if (urlHash) {
      var tab = tabGroup.find('a[href='+urlHash+']')
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
