$(function() {
    // hack for older jquery calls
    $.browser = function() {};

    // fixed header position
    $('#main-header').sticky();

    // scroll smooth
    $('[role=navigation] a, a[href="#home"]').click(function(evt) {
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

    /* Modal windows */
    // register buttons
    $('.register').click(function(evt) {
        $.fallr('show', {
            content: $('#register').html(),
            width: 560 + 100, // 100 = padding width
            closeOverlay: true,
            buttons: {
                button1: {
                    text: 'Close'
                }
            }
        });
        evt.preventDefault();
        return false;
    });
    // support us
    $('[href="#support-content"]').click(function(evt) {
        $.fallr('show', {
            content: $('#support-content').html(),
            width: 400 + 100, // 100 = padding width
            closeOverlay: true,
            buttons: {
                button1: {
                    text: 'Close'
                }
            }
        });
        evt.preventDefault();
        return false;
    });
    // speaker details
    $('#speakers').on('click', 'a.details', function(evt) {
        $.fallr('show', {
            content: $(this).siblings('.body').html(),
            width: 400 + 100, // 100 = padding width
            closeOverlay: true,
            buttons: {
                button1: {
                    text: 'Close'
                }
            }
        });
        evt.preventDefault();
        return false;
    });

    // retrieve contents from speakers to schedule
    function loadScheduleContent() {
        var name, content;
        $('#schedule section p').each(function(e) {
            content = $('#speakers figcaption:contains("' + $(this).text() + '")').closest('li').find('.body').html();
            $(this).siblings('.body').html(content);
        });

        // schedule details
        $('.talk').on('click', 'a', function(evt) {
            $.fallr('show', {
                content: $(this).siblings('.body').html(),
                width: 400 + 100, // 100 = padding width
                closeOverlay: true,
                buttons: {
                    button1: {
                        text: 'Close'
                    }
                }
            });
            evt.preventDefault();
            return false;
        });
    }


    // speakers generator
    $.get('./data/speakers.json', function(speakers) {
        var context = {
            speakers: speakers
        },
            container = $('#speakers .container > ul > li > ul'),
            compiled = Hogan.compile(container.html()),
            render = compiled.render(context);
        container.html(render);
    });
    // schedule generator
    $.get('./data/schedule.json', function(schedules) {
        var context = {
            schedules: schedules
        },
            container = $('#schedule .container > ul'),
            compiled = Hogan.compile(container.html()),
            render = compiled.render(context);
        container.html(render);
        $('#schedule ul li ul.room1 li.day2').prependTo("#day2 .room1");
        $('#schedule ul li ul.room2 li.day2').prependTo("#day2 .room2");
        loadScheduleContent();
    });

    $('.register').on('click', function(e) {
        _gaq.push(['_trackEvent', 'registration', 'register', 'register button']);
    });
});

function loadMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        scrollwheel: false, // scroll page
        center: new google.maps.LatLng(43.34684, 3.222342),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    }),
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(43.34684, 3.222342),
            map: map,
            icon: "./img/marker-logo.png",
            title: 'Web5 Baby!'
        });
}