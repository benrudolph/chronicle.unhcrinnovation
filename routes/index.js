var constants = require('../lib/constants');
var natural = require('natural');
var db = require('../models');
/*
 * GET home page.
 */

exports.index = function(req, res){
  db.Doc.findAll().success(function(docs) {
    res.render('index', { data: JSON.stringify(db.Doc.publicModels(docs)) });
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

exports.sentences = function(req, res) {
  var word = req.param('word'),
      documentId = req.param('documentId');

  db.SentenceDoc.findAll({ where: { word: word, documentId: documentId } }).success(function(sentences) {
    res.json(200, sentences);
  });
};
