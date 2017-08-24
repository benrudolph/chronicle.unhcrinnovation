var _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define('Author', {
    id: { type: DataTypes.STRING, primaryKey: true },
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

  Author.prototype.cssClass = function() {
    if (this.id === 'hocké')
      return 'hocke';
    return this.id;
  }

  return Author;
};


