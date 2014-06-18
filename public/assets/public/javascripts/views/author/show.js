Diction.Views.AuthorShow = Backbone.View.extend({

  className: 'author',

  template: Diction.Templates.authorShow,

  initialize: function() {
    this.$el.html(this.template.render({ model: this.model.toJSON() }));
  },

  render: function() {
    this.drawFigures();

    return this;
  },

  drawFigures: function() {
    var $figure = this.$el.find('.author-figure');
    var data = Diction.popularWords[this.model.id];

    // handle edge case for hocke
    if (!data) {
      data = Diction.popularWords['hock�'];
    }
    if (!this.figure) {
      this.figure = new Diction.Figures.Author({
        svg: d3.select($figure[0]),
        author: this.model,
        data: data
      });

      this.figure.render();
    }
  }

});
