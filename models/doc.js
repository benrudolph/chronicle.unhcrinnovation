var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  var Doc = sequelize.define('Doc', {
    documentId: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    by: DataTypes.STRING,
    sentiment_comp: DataTypes.INTEGER,
    sentiment_score: DataTypes.INTEGER,
    wordCount: DataTypes.INTEGER,
    content: DataTypes.TEXT

  }, {
    classMethods: {
      associate: function(models) {
        Doc.hasMany(models.WordDoc);
        Doc.hasMany(models.SentenceDoc);
      },
      publicModels: function(models) {
        return _.map(models, function(model) {
          return {
            id: model.id,
            documentId: model.documentId,
            sentiment_comp: model.sentiment_comp,
            sentiment_score: model.sentiment_score,
            author: model.author,
            date: model.date,
            title: model.title
          };
        });

      }
    },
  });

  return Doc;
};

