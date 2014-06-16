var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  var Doc = sequelize.define('Doc', {
    documentId: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    by: DataTypes.STRING,
    sentimentComp: DataTypes.INTEGER,
    sentimentScore: DataTypes.INTEGER,
    wordCount: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    year: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        Doc.hasMany(models.WordDoc, { foreignKey: 'documentId' });
        Doc.hasMany(models.SentenceDoc, { foreignKey: 'documentId' });
      },
      publicModels: function(models) {
        return _.map(models, function(model) {
          return {
            id: model.id,
            documentId: model.documentId,
            sentimentComp: model.sentimentComp,
            sentimentScore: model.sentimentScore,
            wordCount: model.wordCount,
            author: model.author,
            date: model.date,
            year: model.year,
            title: model.title
          };
        });

      }
    },
  });

  return Doc;
};

