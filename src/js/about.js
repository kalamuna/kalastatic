(function( pinnacle, $, window ){

  pinnacle.About = function(){

    kala.deeplinkTabs( $('.tabbed-nav') );

    var self = this;

    $('.tabbed-nav').find('a').on('shown.bs.tab', this.onTabChange.bind( this ));

    this.matchHeights();

    return this;
  }

  var p = pinnacle.About.prototype;

  p.constructor = pinnacle.About;

  p.onTabChange = function(){
    this.matchHeights();
  }

  p.matchHeights = function(){
    console.log('!!! matchHeight');
    $('.person .fn').matchHeight(true);
    $('.investor .fn').matchHeight(true);
    $('.person').matchHeight(true);
    $('.investor').matchHeight(true);
  }

  if($('body').hasClass('page-about')){
    pinnacle.about = new pinnacle.About();
  }

}( window.pinnacle = window.pinnacle || {}, jQuery, window ));



