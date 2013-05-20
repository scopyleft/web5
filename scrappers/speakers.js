var casper = require('casper').create({logLevel: 'debug', verbose: false}),
    speakers = [];

casper.start('http://conf2013.web-5.org/en/web-5-speakers-en/', function() {
    speakers = this.evaluate(function() {
        var articles = document.querySelectorAll('#content[role="main"] .hofMember');
        return Array.prototype.map.call(articles, function(e) {
            return {
                img: e.querySelectorAll('.hofPicLink img')[0].getAttribute('src'),
                name: e.querySelectorAll('.speakerAnchor')[0].innerHTML,
                website: e.querySelectorAll('.hofPicLink > div > a:first-child')[0].getAttribute('href'),
                twitter: e.querySelectorAll('.hofPicLink > div > a:last-child')[0].getAttribute('href'),
                bio: [].map.call(e.querySelectorAll('.hofBio p'), function(p) {return p.innerHTML;}),
                talk_title: e.nextSibling
            };
        });
    });
});

casper.run(function() {
    this.echo(JSON.stringify(speakers));
    this.exit();
});