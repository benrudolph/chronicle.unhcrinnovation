var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define('Author', {
    id: DataTypes.STRING,
    fullname: DataTypes.STRING,
    startYear: DataTypes.INTEGER,
    endYear: DataTypes.INTEGER,
    hc: DataTypes.INTEGER,
    url: DataTypes.STRING,
    country: DataTypes.STRING,
    isMale: DataTypes.BOOLEAN,
    birthDate: DataTypes.DATE,
    deathDate: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function(models) {
        Author.hasMany(models.Doc, { foreignKey: 'author' });
        Author.hasMany(models.SentenceDoc, { foreignKey: 'author' });
        Author.hasMany(models.WordDoc, { foreignKey: 'author' });
      },
    },
  });

  return Author;
};


