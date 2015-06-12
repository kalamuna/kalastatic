/**
 * Feature detection for whether the browser has orientation.
 * @static
 */
function hasOrientation() {
  return (
    typeof window.orientation !== 'undefined' ||
    typeof window.orientationchange !== 'undefined' ||
    typeof window.onorientationchange !== 'undefined' ||
    typeof window.DeviceOrientationEvent == 'function' ||
    typeof window.deviceorientation !== 'undefined' ||
    typeof window.MozOrientation !== 'undefined' ||
    typeof Screen.orientation !== 'undefined'
  ) ? true : false;
}

module.exports = hasOrientation;
