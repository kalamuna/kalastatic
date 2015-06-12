// Dependencies
var $ = require('jquery');
var xorCrypt = require('xor-crypt');

function contact() {
  // Run xorCrypt on the contact form to encrypt the email.
  $('#contact').attr('action', function(index, attr) {
    return xorCrypt(attr);
  });
}

module.exports = contact;
