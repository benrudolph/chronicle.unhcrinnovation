var constants = require('./constants');
var natural = require('natural');
var fs = require("fs");
var sentenceTokenizer = require('sentence-tokenizer');
var _ = require("underscore");
var crypto = require('crypto');
var stopwords = require('stopwords').english;
var analyze = require('Sentimental').analyze;

module.exports = function (type) {
  if (!type)
    type = 'docs';

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

    analysis = analyze(content);
    doc.sentimentScore = analysis.score;
    doc.sentimentComp = analysis.comparative;

    sentence.setEntry(content);
    sentences = sentence.getSentences();
    console.log('Parsing doc: ' + i);

    if (type == 'words') {
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

      try {
        wordDocs = _.values(wordDocHash);
        db.WordDoc.bulkCreate(wordDocs).success(function() {
            console.log('successfully created wordDocs');
          });

        sentenceDocs = _.values(wordDocSentenceHash);
        db.SentenceDoc.bulkCreate(sentenceDocs).success(function() {
            console.log('successfully created sentenceDocs');
          });
      } catch (e) {
        console.log(e);
        console.log('failed, reconnecting');
        db = require('../models');
      }
    }
    delete doc.id;

  });

  if (type == 'docs') {
    try {
      db.Doc.bulkCreate(docs).success(function(d) {
        console.log('success');
      });
    } catch (e) {
      console.log(e);
      console.log('failed docs, reconnecting');
      db = require('../models');
    }
  }


};
