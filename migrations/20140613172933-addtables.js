module.exports = {
  up: function(migration, DataTypes, done) {
    // WORD DOCS
    migration.createTable(
    'WordDocs',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      key: DataTypes.STRING,
      count: DataTypes.INTEGER,
      word: DataTypes.STRING,
      raw: DataTypes.STRING,
      author: DataTypes.STRING,
      DocId: DataTypes.INTEGER,
      documentId: DataTypes.STRING,
    },
    {
      engine: 'InnoDB', // default: 'InnoDB'
      charset: 'latin1' // default: null
    });

    // SENTENCE DOCS
    migration.createTable(
    'SentenceDocs',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      DocId: DataTypes.INTEGER,
      key: DataTypes.STRING,
      count: DataTypes.INTEGER,
      word: DataTypes.STRING,
      raw: DataTypes.STRING,
      sentence: DataTypes.TEXT,
      sentenceHash: DataTypes.STRING,
      author: DataTypes.STRING,
      documentId: DataTypes.STRING,
    },
    {
      engine: 'InnoDB', // default: 'InnoDB'
      charset: 'latin1' // default: null
    }
    );

    // DOCS
    migration.createTable(
    'Docs',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      documentId: DataTypes.STRING,
      author: DataTypes.STRING,
      title: DataTypes.STRING,
      date: DataTypes.STRING,
      by: DataTypes.STRING,
      sentimentComp: DataTypes.FLOAT,
      sentimentScore: DataTypes.FLOAT,
      wordCount: DataTypes.INTEGER,
      content: DataTypes.TEXT
    },
    {
      engine: 'InnoDB', // default: 'InnoDB'
      charset: 'latin1' // default: null
    }
    );

    done();
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('SentenceDocs');
    migration.dropTable('WordDocs');
    migration.dropTable('Docs');
    done();
  }
};
