module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'Authors',
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          autoIncrement: false
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        fullname: DataTypes.STRING,
        url: DataTypes.STRING,
        country: DataTypes.STRING,
        startYear: DataTypes.INTEGER,
        endYear: DataTypes.INTEGER,
        isMale: DataTypes.BOOLEAN,
        birthDate: DataTypes.DATE,
        deathDate: DataTypes.DATE,
        hc: DataTypes.INTEGER,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        charset: 'latin1' // default: null
      }
    );

    var db = require('../models');
    var authors = require('../data/authors').authors;
    db.Author.bulkCreate(authors).success(function() {
      done();
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('Authors');
    done();
  }
};
