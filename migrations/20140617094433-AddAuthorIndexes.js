module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('WordDocs', ['author']);
    // add altering commands here, calling 'done' when finished
    done();
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeIndex('WordDocs', ['author']);
    done();
  }
};
