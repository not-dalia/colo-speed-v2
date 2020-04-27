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
  api.register({
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    birthdate: values.birthdate,
    postcode: values.postcode,
    consent: values['consent-1'] == 'on' && values['consent-2'] == 'on',
    interest: values.interest
  }, function(success, data) {
    alert('success: ' + success);
    console.log(data)
  });
  return false;
}

function contact(form) {
  var values = [];
  $.each($(form).serializeArray(), function(i, field) {
    values[field.name] = field.value;
  });
  api.contact({
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    postcode: values.postcode,
    message: values.message,
  }, function(success, data) {
    alert('success: ' + success);
    console.log(data)
  });
  return false;
}

var api = {
  register: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "https://openlab.ncl.ac.uk/dokku/colospeed-api/users/register",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        callback(true, data)
      },
      failure: function(error) {
        callback(false, error)
      }
    });
  },
  contact: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "https://openlab.ncl.ac.uk/dokku/colospeed-api/contact",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        callback(true, data)
      },
      failure: function(error) {
        callback(false, error)
      }
    });
  }
}
