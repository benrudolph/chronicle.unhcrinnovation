module.exports = function(sequelize, DataTypes) {
  var WordDoc = sequelize.define('WordDoc', {
    key: DataTypes.STRING,
    count: DataTypes.INTEGER,
    word: DataTypes.STRING,
    raw: DataTypes.STRING,
    author: DataTypes.STRING,
    documentId: DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        WordDoc.belongsTo(models.Doc);
      }
    }
  });

  return WordDoc;
};
