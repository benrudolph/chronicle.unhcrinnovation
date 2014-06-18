Diction.Collections.Doc = Backbone.Collection.extend({
  model: Diction.Models.Doc,

  comparator: function(d) { return +d.get('date'); }
});

