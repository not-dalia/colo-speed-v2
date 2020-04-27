$("document").ready(function () {
  $("#nav-menu-button").click(function () {
    if ($("#nav-menu-button").text() == "☰") {
      $("#nav-menu-button").text("✖");
    } else {
      $("#nav-menu-button").text("☰");
    }
    $(".nav-items li").toggle("fast");
  });
});

function registerUser(form) {
  var values = [];
  $.each($(form).serializeArray(), function(i, field) {
    values[field.name] = field.value;
  });

  $(form).find(':input').prop('disabled',true)
  $(form).addClass('loading');
  $(form).removeClass('success');
  $(form).removeClass('fail');
  $(form).removeClass('submitted');

  api.register({
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    birthdate: values.birthdate,
    postcode: values.postcode,
    consent: values['consent-1'] == 'on' && values['consent-2'] == 'on',
    interest: values.interest
  }, function(success, data) {
    setTimeout(function () {
      $(form).find(':input').prop('disabled', false);
      $(form).removeClass('loading');
      $(form).addClass('submitted');
      if (!success || !data.success) {
        $(form).addClass('fail');
        $(form).find('.info-message .message').text('Sorry, something went wrong.')
      } else {
        $(form).trigger("reset");
        $(form).addClass('success');
        $(form).find('.info-message .message').text('Thank you for registering your interest.')
      }
    }, 1000)
    
  });
  return false;
}

function contact(form) {
  var values = [];
  $.each($(form).serializeArray(), function(i, field) {
    values[field.name] = field.value;
  });

  $(form).find(':input').prop('disabled',true)
  $(form).addClass('loading');
  $(form).removeClass('success');
  $(form).removeClass('fail');
  $(form).removeClass('submitted');

  
  api.contact({
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    postcode: values.postcode,
    message: values.message,
  }, function(success, data) {
    setTimeout(function () {
      $(form).find(':input').prop('disabled', false);
      $(form).removeClass('loading');
      $(form).addClass('submitted');
      if (!success || !data.success) {
        $(form).addClass('fail');
        $(form).find('.info-message .message').text('Sorry, something went wrong.')
      } else {
        $(form).trigger("reset");
        $(form).addClass('success');
        $(form).find('.info-message .message').text('Thank you for contacting us.')
      }
    }, 1000)
  });
  return false;
}

var api = {
  register: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "https://openlab.ncl.ac.uk/dokku/colospeed-api/users/register",
      // url: "http://localhost:3000//users/register",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        callback(true, data)
      },
      error: function(error) {
        callback(false, error)
      }
    });
  },
  contact: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "https://openlab.ncl.ac.uk/dokku/colospeed-api/contact",
      // url: "http://localhost:3000//contact",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        callback(true, data)
      },
      error: function(error) {
        callback(false, error)
      }
    });
  }
}
