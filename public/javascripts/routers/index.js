Diction.Routers.IndexRouter = Backbone.Router.extend({

  initialize: function(options) {
    Diction.docs = new Diction.Collections.Doc(options.docs);

    this.freqChart = new Diction.Figures.FreqChart({
      docs: Diction.docs
    });

    this.timeline = new Diction.Figures.Timeline({
      docs: Diction.docs
    });
    this.timeline.render();
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
