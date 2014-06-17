Diction.Views.AuthorIndex = Backbone.View.extend({

  template: Diction.Templates.authorIndex,

  initialize: function() {
    this.$el.html(this.template.render({ collection: this.collection }));
    this.views = [];
    this.addAll();
  },

  render: function() {
    _.each(this.views, function(view) { view.render(); });

    return this;
  },

  addAll: function() {
    this.collection.each(this.addOne.bind(this));
  },

  addOne: function(model) {
    view = new Diction.Views.AuthorShow({ model: model });
    this.views.push(view);

    this.$el.append(view.el);
  }

});
