var constants = require('./constants');
var natural = require('natural');
var fs = require("fs");
var sentenceTokenizer = require('sentence-tokenizer');
var _ = require("underscore");
var crypto = require('crypto');
var stopwords = require('stopwords').english;
var analyze = require('Sentimental').analyze;
var Sequelize = require('sequelize')
, sequelize = new Sequelize('toy', 'root', null, {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3306,
  });

module.exports = function () {



  sequelize
    .authenticate()
    .complete(function(err) {
      if (!!err) {
        console.log('Unable to connect to the database:', err)
      } else {
        console.log('Connection has been established successfully.')

        var docs = (JSON.parse(fs.readFileSync("pjscrape_out.txt", "utf8")));
        var tokenizer = new natural.WordTokenizer();
        var db = require('../models');
        var sentence = new sentenceTokenizer();

        docs = _.filter(docs, function(doc) {
          return doc.content.length > 0;
        });
        var iter = 0;

        _.each(docs, function(doc, i) {
          var content = doc.content;
          var docId = doc.id;
          var wordCount = tokenizer.tokenize(doc.content).length;
          doc.wordCount = wordCount;
          var wordDocs = [];
          var wordDocHash = {};
          var wordDocSentenceHash = {};
          var analysis = analyze(content);
          doc.sentiment = {
            score: analysis.score,
            comparative: analysis.score
          };
          sentence.setEntry(content);

          sentences = sentence.getSentences();

          doc.type = constants.SPEECH_DOC;
          _.each(sentences, function(s, j) {
            var words = tokenizer.tokenize(s);
            var sentenceHash = crypto.createHash('md5').update(s).digest('hex');
            _.each(words, function(raw, k) {
              if (stopwords.indexOf(raw) !== -1)
                return;
              iter += 1;
              var word = natural.PorterStemmer.stem(raw.toLowerCase());

              var key = word + docId + sentenceHash;

              if (wordDocSentenceHash[key]) {
                wordDocSentenceHash[key].count ++;
              } else {
                wordDocSentenceHash[key] = {
                  id: key,
                  type: constants.SENTENCE_DOC,
                  count: 1,
                  word: word,
                  documentId: docId,
                  author: doc.author,
                  sentence: s,
                  sentenceHash: sentenceHash,
                  raw: raw.toLowerCase() };
              }

              var docKey = word + docId;
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

          wordDocs = _.values(wordDocSentenceHash);
          db.SentenceDoc.bulkCreate(wordDocs).success(function() {
                console.log('successfully created sentenceDocs');
              });

        });
        db.Doc.bulkCreate(docs).success(function() {
          console.log('successfully created docs');

        });


      }
    });




  };
