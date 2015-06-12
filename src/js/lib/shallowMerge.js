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
function shallowMerge(destObj, sourceObj){
  for (var key in sourceObj) {
    destObj[key] = sourceObj[key];
  }

  return destObj;
};

module.exports = shallowMerge;
