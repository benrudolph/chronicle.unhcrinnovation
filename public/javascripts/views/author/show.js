Diction.Views.AuthorShow = Backbone.View.extend({

  className: 'author',

  template: Diction.Templates.authorShow,

  render: function() {
    this.$el.html(this.template.render({ model: this.model.toJSON() }));
    this.drawFigures();

    return this;
  },

  drawFigures: function() {
    var $figure = this.$el.find('.author-figure');

    if (!this.figure) {
      this.figure = new Diction.Figures.Author({
        svg: d3.select($figure[0]),
        author: this.model,
        data: Diction.popularWords[this.model.id]
      });

      this.figure.render();
    }
  }

});
