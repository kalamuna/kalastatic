
/**
* Feature detection for whether were in a mobile browser or not.
* @static
* @example
* if( kala.isMobile() ) {
*   $("#myElement").on('touchstart', function(){ doSomething() });
* }
*/
function isMobile() {
var hasTouchStart = ('ontouchstart' in document.documentElement),
    hasOrientation = require('hasOrientation');
  return ( hasTouchStart && hasOrientation );
};

module.exports = isMobile;
