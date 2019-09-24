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