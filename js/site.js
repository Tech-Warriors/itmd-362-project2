$('html').removeClass('nojs').addClass('js');

/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

//validate credit card info, emanil
$('#checkout-form').on("submit", function(e) {
  var email = $('#email').val();
  var card = $('#card').val();
  var nCard = $('#nCard').val();
  var date = $('#date').val();
  var code = $('#code').val();
  var emailValid = /^[^\s@]+@[^\s@]+$/;
  var numberValid = /^\d{16}$/;
  var nameValid = /^[a-zA-Z\s]+$/;
  var expValid =  /^\d{4}$/;
  var secValid =  /^\d{3}$/;
  var result = {
    email: false,
    card: false,
    nCard: false,
    date: false,
    code: false
  };
  e.preventDefault();

  if (!emailValid.test(email)) {
    console.log('invalid email');
    $('.invalid').remove();
    $('#email-address').append('<p class="invalid">Please enter valid email</p>');
    return false;
  } else {
    $('#invalid').remove();
    result.email = true;
  }
  if (!numberValid.test(card)) {
    console.log('invalid number');
    $('.invalid').remove();
    $('#credit-card').append('<p class = "invalid">Please enter valid credit card number</P>');
    return false;
  } else {
    $('#invalid').remove();
    result.card = true;
  }

  if (!nameValid.test(nCard)) {
    console.log('invalid name');
    $('.invalid').remove();
    $('#name-card').append('<P class = "invalid">Please enter valid name</p>');
    return false;
  } else {
    $('#invalid').remove();
    result.nCard = true;
  }
  if (!expValid.test(date)) {
    console.log('invalid expiration');
    $('.invalid').remove();
    $('#exp-date').append('<p class="invalid">Please enter valid expiration date</p>');
    return false;
  } else {
    $('#invalid').remove();
    result.date = true;
  }
  if (!expValid.test(code)) {
    console.log('invalid security code');
    $('.invalid').remove();
    $('#sec-code').append('<p class="invalid">Please enter valid security code</p>');
    return false;
  } else {
    $('#invalid').remove();
    result.code = true;
  }

  if (result.email === true && result.card === true && result.nCard === true && result.date === true && result.code === true) {
    $(this).remove();
    $('#review').remove();
    $('#paymentInfo').remove();
    $('body').append('<p class="last-item">Thank you!</p>');
  }
});

//not sure if this code is on the right path or not... can someone check it out and let me know
$('#delivery-form').on('#order-button', function(e) { //by order-button, I mean the link to the pizzabuilder page
  if (!valid_address($('#address').val())) {
    $('label[for="address"]').text("*A valid address has numbers and letters").addClass('warn');
  } else if (!valid_zipcode($('#zip').val())) {
    $('label[for="zip"]').text('*Please enter a 5-digit zip code*').addClass('warn');
  } else if (!valid_phone($('#phone').val())) {
    $('label[for="phone"]').text('*A valid phone number has 10-digits; (800-000-0000)*').addClass('warn');
  } else {
    console.log($('#address').val(), $('#city').val(), $('#zip').val(), $('#phone').val());
    $(this).remove();
    $('#review').append("<p class='success'>ORDER GOES HERE</p>");
  }
  e.preventDefault();
});

function valid_address(address) { //checks to make sure field is not empty
  var result = false;

  if (address.length > 0) {
    result = true;
  }

  return result;
}

function valid_zipcode(zip) { //was trying to mimic the automatic city and state fill out with the zip code API
  var result = false;

  if (zip.length === 5) {
    $.ajax({
      url: '//api.zippopotam.us/us/' + zip,
      statusCode: {
        200: function(data) {
          $('#city').val(data.places[0]["place name"]);
          $('#state').val(data.places[0]["state abbreviation"]);
        },
        404: function() {
          $('label[for="zip"]').append("<b>Let's have another look at the zip code.</b>");
        }
      }
    });
  }

  return result;
}

function valid_phone(phone) { //checks for phone number length
  var result = false;
  var cleaned;

  if (phone.length > 0) {
    cleaned = phone.match(/\d+/g).join('');
    if (cleaned.length >= 10) {
      result = true;
    }
  }

  return result;
}
//TODO: ask memebers if they know how to make this work properly with selected and unselected itms on pizza builder
$(this).toggleClass('checked');

$('.steps a').on('click', function(e){
  var seats = 'a1';

  e.preventDefault();

  //if ($('input:checked'))

  docCookies.setItem('seats',seats);
});

if (docCookies.hasItem('seats')) {
  var invoice = docCookies.getItem('seats');

  $('#size-order').text('Test '+ invoice + '.');
}
