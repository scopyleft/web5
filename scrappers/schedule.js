var casper = require('casper').create({logLevel: 'debug', verbose: false}),
    schedules = [];

casper.start('http://conf2013.web-5.org/en/conference-schedule/', function() {
    schedules = this.evaluate(function() {
        var schedules = document.querySelectorAll('.schedule .track > ul > li'),
            tag;
        return Array.prototype.map.call(schedules, function(e) {
            return {
                day: e.querySelectorAll('time')[0].getAttribute('datetime').split(' ')[0],
                time: e.querySelectorAll('time')[0].innerHTML.split(' – '),
                img: (function(e) {
                    tag = e.querySelectorAll('div > a > img');
                    if(tag.length > 0)
                        return tag[0].getAttribute('src');
                })(e),
                type: 'talk'
            };
        });
    });
});

casper.run(function() {
    this.echo(JSON.stringify(schedules));
    this.exit();
});