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
