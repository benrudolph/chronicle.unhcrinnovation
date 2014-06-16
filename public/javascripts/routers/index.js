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

    this.words = ['camps', 'Syria', 'innovation', 'Germany', 'urban', 'education',
      'sudan', 'peace', 'lebanon'];
    $wordsPerYear = $('#words-per-year');
    this.wordsPerYear = {};
    _.each(this.words, function(word) {
      $wordsPerYear.append(this.wordsPerYearTemplate.render({ word: word }));

      $.get('/words_per_year', { query: word }).success(function(rows) {
        this.wordsPerYear[word] = new Diction.Figures.WordsPerYear({
          data: rows,
          svg: d3.select('.words-per-year-' + word),
          word: word
        });
      }.bind(this));

    }.bind(this));


  },

  routes: {
    'freqchartRoute': 'freqchartRoute',
    'freqchartRoute/:word': 'freqchartRoute',
    'timelineRoute': 'timelineRoute',
    'wordsPerYearRoute': 'wordsPerYearRoute',
    'wordsPerYearRoute/:word': 'wordsPerYearRoute',
  },

  wordsPerYearRoute: function() {
    _.each(this.words, function(word, i) {
      window.setTimeout(this.wordsPerYear[word].render.bind(this.wordsPerYear[word]), i * 300);
    }.bind(this));
  },

  timelineRoute: function() {
    this.timeline.render();
  },

  freqchartRoute: function(query) {
    if (!query)
      query = Diction.Constants.DEFAULT_QUERY;

    $.get('/search', { query: query }, function(response) {
      this.freqChart.dataFn(response).render();
    }.bind(this));
  },

  query: function(query) {
    $.get('/search', { query: query }, function(response) {
      this.freqChart.dataFn(response).render();
    }.bind(this));
  }


});
