var casper = require('casper').create({logLevel: 'debug', verbose: false}),
    speakers = [];

casper.start('http://conf2013.web-5.org/en/web-5-speakers-en/', function() {
    speakers = this.evaluate(function() {
        var articles = document.querySelectorAll('#content[role="main"] .hofMember');
        return Array.prototype.map.call(articles, function(e) {
            return {
                img: e.querySelector('.hofPicLink img').getAttribute('src'),
                name: e.querySelector('.speakerAnchor').innerHTML,
                website: e.querySelector('.hofPicLink > div > a:first-child').getAttribute('href'),
                twitter: e.querySelector('.hofPicLink > div > a:last-child').getAttribute('href'),
                bio: [].map.call(e.querySelectorAll('.hofBio p'), function(p) {return p.innerHTML;}),
                summary: e.querySelector('.hofBio p').innerHTML.substr(0, 50),
                title: e.nextElementSibling.querySelector('h1').innerText.substr(15),
                body: [].map.call(e.nextElementSibling.querySelectorAll('p'), function(p) {return p.innerText}).join("\n"),
            };
        });
    });
});

casper.run(function() {
    this.echo(JSON.stringify(speakers));
    this.exit();
});