module.exports = Queries = {};

Queries.WordsPerYear = function (word) {
  return ["select * from ",
    "(select sum(wordCount) as totalCountPerYear, year from Docs group by year) as t ",
    "join (select sum(count) as wordCount, year, word from WordDocs ",
        "join Docs on WordDocs.documentId = Docs.documentId where word = '" + word + "'  ",
        "group by year, `word`) as t2 on t.year = t2.year"].join(' ');
};
