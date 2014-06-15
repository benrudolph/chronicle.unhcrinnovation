module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('SentenceDocs', ['word', 'documentId']);
    //migration.addIndex('WordDoc', 'word');
    // add altering commands here, calling 'done' when finished
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeIndex('SentenceDocs', ['word', 'documentId']);
    //migration.removeIndex('WordDoc', 'word');
    done()
  }
}
