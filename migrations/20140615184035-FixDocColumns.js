module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'Docs',
      'wordCount',
      DataTypes.INTEGER
    );
    migration.renameColumn('Docs', 'sentiment_score', 'sentimentScore');
    migration.renameColumn('Docs', 'sentiment_comp', 'sentimentComp');
    done();
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.addColumn(
      'Docs',
      'wordCount'
    );
    migration.renameColumn('Docs', 'sentimentScore', 'sentiment_score');
    migration.renameColumn('Docs', 'sentimentComp', 'sentiment_comp');
    done();
  }
};
