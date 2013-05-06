$(function() {
    // fixed header position
    $('#main-header').sticky();

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

    // Gmaps
    loadMap();

    // Modal windows
    $('.prime').click(function(evt) {
        $.browser = function(){}
        $.fallr('show', {
            content     : $('#register').html(),
            width       : 560 + 100, // 100 = padding width
            icon        : 'chat',
            closeOverlay: true,
            buttons     : {
                button1 : {text: 'Close'}
            }
        });
        evt.preventDefault();
        return false;
    });
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
