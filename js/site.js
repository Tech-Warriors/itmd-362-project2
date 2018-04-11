$('html').removeClass('nojs').addClass('js');

$('#checkout-form').on("submit", function(e) {
  var email = $('#email').val();
  var nCard = $('#nCard').val();
  var emailValid = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  var nameValid = /^[a-zA-Z\s]+$/;
  e.preventDefault();
  if (!nameValid.test(nCard)) {
    console.log('invalid name');
    $('#invalid').remove();
    $('#nameCard').append('<li id="invalid">Letters and spaces only</li>');
    return false;
  } else if (!emailValid.test(email)) {
    console.log('invalid email');
    $('#invalid').remove();
    $('#emailAddress').append('<li id="invalid">Please enter valid email</li>');
    return false;
  } else {
    $(this).remove();
    $('#review').remove();
    $('#paymentInfo').remove();
    $('body').append('<h2>Thank you!</h2>');
  }
});

//not sure if this code is on the right path or not... can someone check it out and let me know
  $('#delivery-form').on('#order-button', function(e) { //by order-button, I mean the link to the pizzabuilder page
    if(!valid_address($('#address').val())) {
      $('label[for="address"]').text("*A valid address has numbers and letters").addClass('warn');
    }
    else if(!valid_zipcode($('#zip').val())) {
      $('label[for="zip"]').text('*Please enter a 5-digit zip code*').addClass('warn');
    }
    else if(!valid_phone($('#phone').val())) {
      $('label[for="phone"]').text('*A valid phone number has 10-digits; (800-000-0000)*').addClass('warn');
    }
    else {
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
      }
      );
    }

    return result;
  }

  function valid_phone(phone) { //checks for phone number length
    var result = false;
    var cleaned;

    if (phone.length > 0) {
      cleaned = phone.match(/\d+/g).join('');
      if(cleaned.length >= 10) {
        result = true;
      }
    }

    return result;
  }
