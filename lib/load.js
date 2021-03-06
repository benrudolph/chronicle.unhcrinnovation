var constants = require('./constants');
var natural = require('natural');
var fs = require("fs");
var sentenceTokenizer = require('sentence-tokenizer');
var _ = require("lodash");
var crypto = require('crypto');
var stopwords = require('stopwords').english;
var analyze = require('Sentimental').analyze;

/**
 * Seeds the database with necessary tables:
 *  Docs, WordDocs, SentenceDocs
 *
 * type - Either 'docs' or 'words'. 'docs' loads Docs table while
 *  'words' loads both SentenceDocs and WordDocs
 */
module.exports = function (type) {
  if (!type)
    type = 'docs';

  var docs = (JSON.parse(fs.readFileSync("pjscrape_out.txt", "utf8")));
  var db = require('../models');

  docs = _.filter(docs, function(doc) {
    return doc.content.length > 0;
  });

  var wordAndSentenceDocs = _.map(docs, parseDoc);

  if (type === 'docs') {
    db.Doc.bulkCreate(docs).done(function(d) {
      console.log('success');
    });
  } else {
    var wordDocs = _.reduce(wordAndSentenceDocs, function(memo, obj) { return memo.concat(obj.wordDocs); }, [])
    var sentenceDocs = _.reduce(wordAndSentenceDocs, function(memo, obj) { return memo.concat(obj.sentenceDocs); }, [])

    chunk(wordDocs, 'WordDoc', 0)
    chunk(sentenceDocs, 'SentenceDoc', 0)
  }
};

function chunk(docs, klass, start) {
  var db = require('../models');
  var size = 5000,
      docChunk = docs.slice(start, start + size);
  console.log('Saving ' + (start + size) + ' / ' + docs.length)

  db[klass].bulkCreate(docChunk).done(function() {
    console.log('successfully created ' + klass);
    if (start < docs.length) {
      chunk(docs, klass, start + size)
    }
  });
}


function parseDoc(doc, i, docs) {
    var content = doc.content,
        docId = doc.id,
        wordDocs = [],
        wordDocHash = {},
        tokenizer = new natural.WordTokenizer(),
        sentence = new sentenceTokenizer(),
        wordDocSentenceHash = {},
        analysis;


    doc.wordCount = tokenizer.tokenize(doc.content).length;
    doc.documentId = doc.id;
    doc.type = constants.SPEECH_DOC;
    doc.year = (new Date(doc.date)).getFullYear();

    analysis = analyze(content);
    doc.sentimentScore = analysis.score;
    doc.sentimentComp = analysis.comparative;

    sentence.setEntry(content);
    sentences = sentence.getSentences();
    console.log('Parsing doc: ' + i + ' / ' + docs.length);

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

    sentenceDocs = _.values(wordDocSentenceHash);

    delete doc.id;

    return {
      wordDocs: wordDocs,
      sentenceDocs: sentenceDocs,
    }

}
