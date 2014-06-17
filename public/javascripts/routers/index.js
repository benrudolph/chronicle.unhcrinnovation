Diction.Routers.IndexRouter = Backbone.Router.extend({

  wordsPerYearTemplate: Diction.Templates.wordsPerYear,

  initialize: function(options) {
    Diction.docs = new Diction.Collections.Doc(options.docs);
    Diction.authors = new Diction.Collections.Author(options.authors);
    Diction.popularWords = _.groupBy(options.popularWords, 'author');

    this.loaded = false;
    this.renderAttempted = false;

    this.freqChart = new Diction.Figures.FreqChart({
      docs: Diction.docs
    });
    this.timeline = new Diction.Figures.Timeline({
      docs: Diction.docs
    });
    this.authorView = new Diction.Views.AuthorIndex({ collection: Diction.authors });

    $('#author-popular-words').html(this.authorView.el);

    this.words = Diction.Constants.DEFAULT_WORDS;
    $wordsPerYear = $('#words-per-year');
    this.wordsPerYear = {};

    var count = 0;
    _.each(this.words, function(word) {
      $wordsPerYear.append(this.wordsPerYearTemplate.render({ word: word }));

      $.get('/words_per_year', { query: word }).success(function(rows) {
        count ++;
        this.wordsPerYear[word] = new Diction.Figures.WordsPerYear({
          data: rows,
          svg: d3.select('.words-per-year-' + word),
          word: word
        });
        if (count == this.words.length) {
          this.loaded = true;
        }
        if (this.renderAttempted && this.loaded) {
          this.wordsPerYearRoute();
        }
      }.bind(this));

    }.bind(this));


  },

  routes: {
    'freqchartRoute': 'freqchartRoute',
    'timelineRoute': 'timelineRoute',
    'wordsPerYearRoute': 'wordsPerYearRoute',
    'wordsPerYearRoute/:word': 'wordsPerYearRoute',
    'authorsRoute': 'authorsRoute'
  },

  wordsPerYearRoute: function() {
    if (!this.loaded) {
      this.renderAttempted = true;
      return;
    }
    _.each(this.words, function(word, i) {
      window.setTimeout(this.wordsPerYear[word].render.bind(this.wordsPerYear[word]), i * 300);
    }.bind(this));

    $('#words-per-year-container #search').val('');
  },

  authorsRoute: function() {
    this.authorView.render();
  },

  timelineRoute: function() {
    this.timeline.render();
  },

  freqchartRoute: function(query) {
    if (!query)
      query = Diction.Constants.DEFAULT_QUERY;

    NProgress.start();
    $.get('/search', { query: query }, function(response) {
      this.freqChart.queryFn(query).dataFn(response).render();

      $('#figure-container #search').val('');
      NProgress.done();
    }.bind(this));
  },

  query: function(query) {
    $.get('/search', { query: query }, function(response) {
      this.freqChart.dataFn(response).render();
    }.bind(this));
  }


});
