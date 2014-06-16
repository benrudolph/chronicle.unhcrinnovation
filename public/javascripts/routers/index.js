Diction.Routers.IndexRouter = Backbone.Router.extend({

  wordsPerYearTemplate: Diction.Templates.wordsPerYear,

  initialize: function(options) {
    Diction.docs = new Diction.Collections.Doc(options.docs);

    this.freqChart = new Diction.Figures.FreqChart({
      docs: Diction.docs
    });

    this.timeline = new Diction.Figures.Timeline({
      docs: Diction.docs
    });
    this.timeline.render();

    this.words = ['camps', 'syria', 'innovation', 'germany', 'urban', 'education',
      'sudan', 'peace', 'lebanon'];
    $wordsPerYear = $('#words-per-year');
    _.each(this.words, function(word) {
      $wordsPerYear.append(this.wordsPerYearTemplate.render({ word: word }));

      $.get('/words_per_year', { query: word }).success(function(rows) {
        var wordsPerYear = new Diction.Figures.WordsPerYear({
          data: rows,
          svg: d3.select('.words-per-year-' + word)
        });
        wordsPerYear.render();
      }.bind(this));

    }.bind(this));


  },

  routes: {
    ':query': 'query',
  },

  query: function(query) {
    $.get('/search', { query: query }, function(response) {
      this.freqChart.dataFn(response).render();
    }.bind(this));
  }


});
