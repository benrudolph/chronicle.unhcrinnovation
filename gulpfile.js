var gulp = require('gulp');
var nano = require('nano')('http://localhost:5984');
var constants = require('./lib/constants');

gulp.task('db:create', function() {
  nano.db.create(constants.DB_NAME, function(err, body) {
    if (!err) {
      console.log('database ' + constants.DB_NAME + ' created!');
    } else {
      console.log(err);
    }
  });
});

gulp.task('db:destroy', function() {
  nano.db.destroy(constants.DB_NAME, function(err, body) {
    if (!err) {
      console.log('database ' + constants.DB_NAME + ' destoryed!');
    } else {
      console.log(err);
    }
  });

});

gulp.task('db:load', function() {
  var load = require('./lib/load');
  console.log('Loading docs...')
  load()

  // Load Word and sentence docs
  console.log('Loading word and sentence docs...')
  load('words');
});

gulp.task('db:views', function() {
  var views = require('./lib/views');
  views();
});

gulp.task('json2csv', function() {
  var json2csv = require('json2csv');
  var fs = require('fs');

  var json = (JSON.parse(fs.readFileSync("pjscrape_out.txt", "utf8")));
  json2csv({data: json, fields: ['id', 'type', 'count', 'word', 'docId', 'sentence', 'raw', 'author', 'date']}, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile('file.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  });

});

gulp.task('scrape', function() {
  var scraper = require('./lib/scraper');
  scraper();

  var exec = require('child_process').exec;

  exec('phantomjs lib/pjscrape/pjscrape.js lib/scraper.js');
});
