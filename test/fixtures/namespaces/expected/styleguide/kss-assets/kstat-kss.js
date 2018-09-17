
// simulate drupal attach
// quick way to simulate drupal behaviors without the Drupal behaviors
// so we can write clean Drupal.behaviors.attach compatible js
var Drupal = Drupal || { behaviors: {}};
for (var key in Drupal.behaviors) {
  if (!Drupal.behaviors.hasOwnProperty(key)) continue;
  var obj = Drupal.behaviors[key];
  obj.attach();
}

(function( kstatKSS, $, window, vex, undefined) {

  $(document).ready(function(){
    vex.defaultOptions.className = 'vex-theme-plain';
    kstatKSS.initialize();
  });

  kstatKSS.slugify = function(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  kstatKSS.initialize = function() {

    $(".sidebar-toggle").on('click', function(e) {
      kstatKSS.toggleSidebar();
      e.preventDefault();
    });

    // When you click outside the sidebar, the sidebar should close.
    $(document.body).on("click", ".nav-active", function(e) {
      if ( $(e.target).closest('.kss-sidebar').length < 1 && $(e.target).closest('.sidebar-toggle').length < 1) {
        e.preventDefault();
        kstatKSS.closeSidebar();
      }
    });

    // Wire up individual components
    $('.kss-sidebar .kss-nav > ul > li').on('click', function() {
      $(".kss-sidebar").data("active",$(this));
    });


    $('.kss-sidebar .kss-nav > ul > li .kss-nav__menu-child-actuator').on('click', function(e){
      console.log("»|»»", e);
      e.preventDefault();
      $(this).closest('.kss-nav__menu-item').toggleClass('active');
    });

    $('.component_details .controls .markup_toggle').on('click', function(e) {
      e.preventDefault();
      vex.open({
        unsafeContent: $(this).closest('.component_details').find('.kss-markup').html()
      });
    });

    $('.component_details .controls .modifiers_toggle').on('click', function(e) {
      e.preventDefault();
      vex.open({
        unsafeContent: $(this).closest('.component_details').find('.kss-modifier__wrapper').html()
      });
    });

    $(".kss-sidebar .kss-nav__menu .kss-nav__menu-item").each(function(){
      if( $(this).attr("class") &&
          $(".kss-header h1").attr('id') &&
          kstatKSS.slugify($(".kss-header h1").attr('id')) == kstatKSS.slugify($(this).attr("class"))
      ) {
        $(this).addClass("active");
        $(".kss-sidebar").data('active', $(this))
      }
    });
  }

  kstatKSS.closeSidebar = function() {
    $(".kss-main").removeClass('nav-active');
  }

  kstatKSS.openSidebar = function(el) {
    $(".kss-main").addClass('nav-active');
    $(".kss-sidebar").data("active", el);
    $(".kss-sidebar").data("active").addClass('active');
  }

  kstatKSS.toggleSidebar = function() {
    $(".kss-main").toggleClass('nav-active');
  }

  kstatKSS.toggleComponentVariants = function(el) {
    el.closest('.component-description').find(".variants .kss-drawer").toggleClass("active");
    el.toggleClass("active");
  }

  kstatKSS.closeComponentVariants = function(el) {
    el.closest('.component-description').find(".variants .kss-drawer").removeClass("active");
    el.removeClass("active");
  }

  kstatKSS.toggleComponentSource = function(el) {
    el.closest(".component-description").find(".markup .kss-drawer").toggleClass("active");
    el.toggleClass("active");
  }

  kstatKSS.closeComponentSource = function(el) {
    el.closest('.component-description').find(".markup .kss-drawer").removeClass("active");
    el.removeClass("active");
  }

}(window.kstatKSSTemplate = window.kstatKSSTemplate || {}, jQuery, window, window.vex, undefined));