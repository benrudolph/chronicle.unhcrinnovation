var constants = require('../lib/constants');
var natural = require('natural');
var db = require('../models');
var queries = require('../queries/queries');
/*
 * GET home page.
 */


exports.index = function(req, res){
  db.Doc.findAll().success(function(docs) {
    db.Author.findAll().success(function(authors) {
      res.render('index', {
        data: JSON.stringify(db.Doc.publicModels(docs)),
        authors: JSON.stringify(authors)
      });
    });
  });

};

exports.wordCounts = function(req, res) {
};

exports.search = function(req, res) {
  var query = req.param('query');

  db.WordDoc.findAll({ where: { word: natural.PorterStemmer.stem(query)  } }).success(function(docs) {

    res.json(200, docs);
  });

};

exports.wordsPerYear = function(req, res) {
  console.log(req.param('query'));
  var query = natural.PorterStemmer.stem(req.param('query'));

  db.sequelize.query(queries.WordsPerYear(query)).success(function(rows) {
    res.json(200, rows);
  });

};

exports.sentences = function(req, res) {
  var word = req.param('word'),
      documentId = req.param('documentId');

  db.SentenceDoc.findAll({ where: { word: word, documentId: documentId } }).success(function(sentences) {
    res.json(200, sentences);
  });
};
