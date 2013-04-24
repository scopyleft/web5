$(function() {
    // fixed header position
    $('body > header').scrollToFixed();

    // scroll smooth
    $('[role=navigation] a').click(function() {
        var href = $.attr(this, 'href');
        $('html,body').animate({
            scrollTop: $(href).offset().top
        }, 500, function () {
            window.location.hash = href;
    });
    return false;
});
});