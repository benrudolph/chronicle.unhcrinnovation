Diction.Views.AuthorIndex = Backbone.View.extend({

  template: Diction.Templates.authorIndex,

  render: function() {
    this.$el.html(this.template.render({ collection: this.collection }));
    this.addAll();

    return this;
  },

  addAll: function() {
    this.collection.each(this.addOne.bind(this));
  },

  addOne: function(model) {
    view = new Diction.Views.AuthorShow({ model: model });

    this.$el.append(view.render().el);
  }

});
