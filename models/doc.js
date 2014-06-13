module.exports = function(sequelize, DataTypes) {
  var Doc = sequelize.define('Doc', {
    documentId: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    by: DataTypes.STRING,
    sentiment_comp: DataTypes.INTEGER,
    sentiment_score: DataTypes.INTEGER,
    content: DataTypes.TEXT

  }, {
    classMethods: {
      associate: function(models) {
        Doc.hasMany(models.WordDoc);
      }
    }
  });

  return Doc;
};

