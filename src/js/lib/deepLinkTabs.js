/**
 * Sets url hash according to deeplinks
 * And triggers the active tab (in a bootstrap tab group) if it's tabs's href matches the urlHash then we fire the click event.
 * @static
 * @example
 * kala.deepTabs( "#a-tab-group", "a");
 * @todo implement https://github.com/medialize/URI.js
 */
function deeplinkTabs(tabGroupSelector) {

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

module.exports = deeplinkTabs;
