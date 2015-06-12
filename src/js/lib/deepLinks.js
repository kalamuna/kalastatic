/**
 * Sets url hash according to deeplinks
 * If a link's href matches the urlHash then we fire the click event.
 * @static
 * @example
 * kala.deeplinks( "#primary-nav", "li a");
 * @todo implement https://github.com/medialize/URI.js
 */
function deepLinks(containerSelector, linkSelector) {

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

module.exports = deepLinks;
