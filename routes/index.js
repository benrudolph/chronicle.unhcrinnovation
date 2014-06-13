var nano = require('nano')('http://localhost:5984');
var constants = require('../lib/constants');
var db = nano.use(constants.DB_NAME);
var natural = require('natural');
/*
 * GET home page.
 */

exports.index = function(req, res){
  db.view('application', 'by_id', function(err, body) {
    res.render('index', { data: JSON.stringify(body) });
  });
};

exports.wordCounts = function(req, res) {
  nano.dinosaur({
    db: constants.DB_NAME,
    path: '_all_docs'
  }, function(err, body) {
    res.json(200, body);
  });
};

exports.search = function(req, res) {
  var query = req.param('query');

  db.view('application', 'by_word', { key: natural.PorterStemmer.stem(query) }, function(err, body) {
    res.json(200, body);
  });

};
