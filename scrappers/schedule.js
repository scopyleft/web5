var casper = require('casper').create({logLevel: 'debug', verbose: false}),
    schedules = [];

casper.start('http://conf2013.web-5.org/en/conference-schedule/', function() {
    schedules = this.evaluate(function() {
        var schedules = document.querySelectorAll('.schedule .track > ul > li'),
            tag, obj, content;
        return Array.prototype.map.call(schedules, function(e) {
            obj = {
                day: e.querySelector('time').getAttribute('datetime').split(' ')[0],
                time: e.querySelector('time').innerHTML.split(' – '),
                img: (function(e) {
                    tag = e.querySelector('div > a > img');
                    if(tag)
                        return tag.getAttribute('src');
                })(e),
                room: e.parentNode.parentNode.querySelector('.breakTime').innerText,
                is_alternative: (e.parentNode.parentNode.querySelector('.breakTime').innerText == "Amphi Linus Torvalds"),
                is_day2: (e.querySelector('time').getAttribute('datetime').split(' ')[0] == '2013-06-15'),
                speaker: (e.querySelector('.wp-caption-text') ? e.querySelector('.wp-caption-text').innerText.split(' – ')[0] : null),
                title: (e.querySelector('.wp-caption-text') ? e.querySelector('.wp-caption-text').innerText.split(' – ')[1] : null),
                is_talk: (!e.querySelector('.breakTime')),
                type: (function(e) {
                    breaktime = e.querySelector('.breakTime');
                    if(breaktime) {
                        if(breaktime.innerText.indexOf('LUNCH') > 0)
                            return 'lunch';
                        else
                            return 'break';
                    } else {
                        return 'talk';
                    }
                })(e)
            };
            return obj;
        });
    });
});

casper.run(function() {
    this.echo(JSON.stringify(schedules));
    this.exit();
});
