var constants = require('./constants');
var natural = require('natural');
var fs = require("fs");
var sentenceTokenizer = require('sentence-tokenizer');
var _ = require("underscore");
var crypto = require('crypto');
var stopwords = require('stopwords').english;
var analyze = require('Sentimental').analyze;
var Sequelize = require('sequelize')
, sequelize = new Sequelize('unhcrdiction', 'root', null, {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3306,
  });

module.exports = function () {

  var docs = (JSON.parse(fs.readFileSync("pjscrape_out.txt", "utf8")));
  var tokenizer = new natural.WordTokenizer();
  var db = require('../models');
  var sentence = new sentenceTokenizer();

  docs = _.filter(docs, function(doc) {
    return doc.content.length > 0;
  });

  _.each(docs, function(doc, i) {
    var content = doc.content,
        docId = doc.id,
        wordDocs = [],
        wordDocHash = {},
        wordDocSentenceHash = {},
        analysis;


    doc.wordCount = tokenizer.tokenize(doc.content).length;
    doc.documentId = doc.id;
    doc.type = constants.SPEECH_DOC;
    delete doc.id;

    analysis = analyze(content);
    doc.sentiment_score = analysis.score;
    doc.sentiment_comp = analysis.comparative;

    sentence.setEntry(content);
    sentences = sentence.getSentences();
    console.log('Parsing doc: ' + i);

    _.each(sentences, function(s, j) {
      var words = tokenizer.tokenize(s),
          sentenceHash = crypto.createHash('md5').update(s).digest('hex');

      _.each(words, function(raw, k) {
        if (stopwords.indexOf(raw) !== -1)
          return;

        var word = natural.PorterStemmer.stem(raw.toLowerCase()),
            key = word + docId + sentenceHash,
            docKey = word + docId;

        if (wordDocSentenceHash[key]) {
          wordDocSentenceHash[key].count ++;
        } else {
          wordDocSentenceHash[key] = {
            key: key,
            type: constants.SENTENCE_DOC,
            count: 1,
            word: word,
            documentId: docId,
            author: doc.author,
            sentence: s,
            sentenceHash: sentenceHash,
            raw: raw.toLowerCase() };
        }

        if (wordDocHash[docKey]) {
          wordDocHash[docKey].count ++;
        } else {
          wordDocHash[docKey] = {
            key: docKey,
            type: constants.WORD_DOC,
            count: 1,
            word: word,
            author: doc.author,
            documentId: docId,
            raw: raw.toLowerCase() };
        }

      });
    });


    wordDocs = _.values(wordDocHash);
    db.WordDoc.bulkCreate(wordDocs).success(function() {
          console.log('successfully created wordDocs');
        });

    sentenceDocs = _.values(wordDocSentenceHash);
    db.SentenceDoc.bulkCreate(sentenceDocs).success(function() {
          console.log('successfully created sentenceDocs');
        });
    (function(wordDocs, sentenceDocs) {
        db.Doc.create(doc).success(function(d) {
          console.log('success')
          d.setWordDocs(wordDocs);
          d.setSentenceDocs(wordDocs);
      });
    })(wordDocs, sentenceDocs);

  });

};
