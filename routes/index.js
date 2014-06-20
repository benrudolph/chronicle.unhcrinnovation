var constants = require('../lib/constants');
var natural = require('natural');
var db = require('../models');
var queries = require('../queries/queries');
var popularWords = require('../data/popular_words').words;
/*
 * GET home page.
 */


exports.index = function(req, res){
  db.Doc.findAll().success(function(docs) {
    db.Author.findAll({ order: ['hc'] }).success(function(authors) {
      res.render('index', {
        data: JSON.stringify(db.Doc.publicModels(docs)),
        authors: authors,
        popularWords: JSON.stringify(popularWords)
      });
    });
  });

};

exports.popularWordsByAuthor = function(req, res) {
  res.json(200, popularWords);
};

exports.search = function(req, res) {
  var query = req.param('query') || '';

  db.WordDoc.findAll({ where: { word: natural.PorterStemmer.stem(query)  } }).success(function(docs) {

    res.json(200, docs);
  });

};

exports.wordsPerYear = function(req, res) {
  var query = natural.PorterStemmer.stem(req.param('query') || '');

  db.sequelize.query(queries.WordsPerYear(query)).success(function(rows) {
    res.json(200, rows);
  });

};

exports.sentences = function(req, res) {
  var word = req.param('word') || '',
      documentId = req.param('documentId');

  db.SentenceDoc.findAll({ where: { word: word, documentId: documentId } }).success(function(sentences) {
    res.json(200, sentences);
  });
};
