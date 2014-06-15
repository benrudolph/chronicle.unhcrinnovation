var _ = require('underscore');
var ejs = require('ejs');
var fs = require('fs');

module.exports = function() {

  var maxPages = 30;
  var pageSize = 10;
  var base = 'http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f';

  var authorHash = {
    'guterres': [],
    'lubbers': [],
    'ogata': [],
    'stoltenberg': [],
    'hocké': [],
    'hartling': [],
    'khan': [],
    'schnyder': [],
    'lindt': [],
    'Goedhart': []
  };

  var authors = _.keys(authorHash);
  var authorParam,
      skipParam;

  var scraper = '';

  for (var i = 0; i < authors.length; i += 1) {
    for (var j = 0; j < maxPages; j+=1) {
      authorParam = 'author=' + encodeURI(authors[i]);
      skipParam = 'skip=' + (j * pageSize);

      authorHash[authors[i]].push(base + '&' + [authorParam, skipParam].join('&'));
    }
    fs.readFile('./lib/scraper_template.js.ejs', 'utf8', (function(i) {
          return function(err, data) {
            if (err) {
              return console.log(err);
            }
            var includeConfig = i == authors.length - 1;
            scraper += ejs.render(data,
              { config: includeConfig, author: authors[i], urls: authorHash[authors[i]] });

            if (i == authors.length - 1) {
              fs.writeFile('./lib/suites.js', scraper, function(err) {
                if (err)
                  console.log(err);
              });
            }
          };
    })(i));
  }

};

