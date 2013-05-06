$(function() {
    // fixed header position
    $('body > header').scrollToFixed();

    // scroll smooth
    $('[role=navigation] a').click(function(evt) {
        var href = $.attr(this, 'href');
        $('html,body').animate({
            scrollTop: $(href).offset().top
        }, 500, function() {
            window.location.hash = href;
        });
        evt.preventDefault();
    });
    loadMap();
});

function loadMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(43.345155, 3.241053),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }),
    marker = new google.maps.Marker({
          position: new google.maps.LatLng(43.345155, 3.241053),
          map: map,
          icon: "./img/marker.svg",
          title: 'Web5 Baby!'
      });
}
