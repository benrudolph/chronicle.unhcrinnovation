select t.*, c / sum as normalized from (select sum(count) as c, word, raw, author from WordDocs group by word, author order by c desc) as t
join (select sum(wordCount) as sum, author from Docs group by author) as t2 on t.author = t2.author order by normalized desc