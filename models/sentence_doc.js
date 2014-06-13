module.exports = function(sequelize, DataTypes) {
  var SentenceDoc = sequelize.define('SentenceDoc', {
    key: DataTypes.STRING,
    count: DataTypes.INTEGER,
    word: DataTypes.STRING,
    raw: DataTypes.STRING,
    author: DataTypes.STRING,
    sentence: DataTypes.TEXT,
    sentenceHash: DataTypes.STRING,
    documentId: DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        SentenceDoc.belongsTo(models.Doc);
      }
    }
  });

  return SentenceDoc;
};

