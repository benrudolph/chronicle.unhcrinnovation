var http = require('http');
var nano = require('nano')('http://localhost:5984');
var constants = require('./constants');
var natural = require('natural');
var fs = require("fs");
var sentenceTokenizer = require('sentence-tokenizer');
var _ = require("underscore");
var crypto = require('crypto');
var stopwords = require('stopwords').english;

module.exports = function () {
  var docs = (JSON.parse(fs.readFileSync("pjscrape_out.txt", "utf8")));
  var db = nano.use(constants.DB_NAME);
  var tokenizer = new natural.WordTokenizer();
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
            docId: docId,
            sentence: s,
            sentenceHash: sentenceHash,
            raw: raw.toLowerCase() };
        }

        var docKey = word + docId;
        if (wordDocHash[docKey]) {
          wordDocHash[docKey].count ++;
        } else {
          wordDocHash[docKey] = {
            id: docKey,
            type: constants.WORD_DOC,
            count: 1,
            word: word,
            docId: docId,
            raw: raw.toLowerCase() };
        }

      });
    });

    console.log('sendin doc: ' + i);

    wordDocs = _.values(wordDocHash);
    db.bulk({ docs: wordDocs }, function(err, body) {
      if (!err)
        console.log('success!');
      else
        console.log(err);
    });
    wordDocs = _.values(wordDocSentenceHash);
    db.bulk({ docs: wordDocs }, function(err, body) {
      if (!err)
        console.log('success!');
      else
        console.log(err);
    });
  });
  db.bulk({ docs: docs }, function(err, body) {
    if (!err)
      console.log('success!');
    else
      console.log(err);
  });

};
