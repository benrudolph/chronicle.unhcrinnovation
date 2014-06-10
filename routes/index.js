var nano = require('nano');
var dbWords = nano('http://localhost:5984/words');
var dbSpeeches = nano('http://localhost:5984/speeches');
var natural = require('natural');
/*
 * GET home page.
 */

exports.index = function(req, res){
  dbSpeeches.view('application', 'by_id', function(err, body) {
    res.render('index', { data: JSON.stringify(body) });
  });
};

exports.search = function(req, res) {
  var query = req.param('query');

  dbWords.view('application', 'by_word', { key: natural.PorterStemmer.stem(query) }, function(err, body) {
    res.json(200, body);
  });

};
