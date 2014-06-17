var _ = require('underscore');
module.exports = Queries = {};

Queries.WordsPerYear = function (word) {
  return ["select * from ",
    "(select sum(wordCount) as totalCountPerYear, year from Docs group by year) as t ",
    "join (select sum(count) as wordCount, year, word from WordDocs ",
        "join Docs on WordDocs.documentId = Docs.documentId where word = '" + word + "'  ",
        "group by year, `word`) as t2 on t.year = t2.year"].join(' ');
};

Queries.PopularWordsByAuthor = function (authors, limit) {
  if (!limit) { limit = 20; }
  var query = [];
  _.each(authors, function(author) {
    query.push(['(select t1.*, t2.totalWordCount from ',
      '((select sum(count) as wordCount, word, raw, author from wordDocs group by author, word order by wordCount desc) as t1',
      'join',
      '(select sum(count) as totalWordCount, author from wordDocs group by author) as t2 on t1.author = t2.author)',
      'where t1.author = \'' + author.id + '\' limit ' + limit + ')'
      ].join(' '));
  });

  return query.join(' union all ');
};
