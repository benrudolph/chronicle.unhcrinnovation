Diction.Models.Author = Backbone.Model.extend({

  cssClass: function() {
    if (this.id === 'hocké')
      return 'hocke';
    return this.id;
  }

});
