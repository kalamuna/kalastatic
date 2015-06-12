(function( kalastatic, $, window ){

  // Run xorCrypt on the contact form to encrypt the email.
  $('#contact').attr('action', function(index, attr) {
    return window.xorCrypt(attr);
  });

}( window.kalastatic = window.kalastatic || {}, jQuery, window ));
