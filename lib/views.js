var nano = require('nano')('http://localhost:5984');
var constants = require('./constants');

module.exports = function() {
  var db = nano.use(constants.DB_NAME);

  var design_doc = {
    views: {
      by_word: {
        map: function(doc) {
          if (doc.type == 'word_doc') {
            emit(doc.word, {
              id: doc.id,
              type: doc.type,
              word: doc.word,
              count: doc.count,
              docId: doc.docId,
              sentence: doc.sentence,
              raw: doc.raw });
          }
        }
      },
      by_author: {
        map: function(doc) {
          if (doc.type == 'speech_doc') {
            emit(doc.author, {
              type: doc.type,
              id: doc.id,
              author: doc.author,
              title: doc.title,
              date: doc.date,
              by: doc.by });
          }
        }
      },
      by_id: {
        map: function(doc) {
          if (doc.type == 'speech_doc') {
            emit(doc.id, {
              type: doc.type,
              id: doc.id,
              author: doc.author,
              title: doc.title,
              date: doc.date,
              by: doc.by });
          }
        }
      }
    }
  };

  db.insert(design_doc, '_design/application');
};

