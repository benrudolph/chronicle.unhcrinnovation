var Diction = {
  Constants: {
    ENTER: 13,
    DURATION: 500
  },
  Figures: {},
  Routers: {},
  Models: {},
  Views: {},
  Collections: {},
  Templates: {
    wordsPerYear: new EJS({ url: '/templates/words_per_year.html.ejs'}),
    wordsPerYearTooltip: new EJS({ url: '/templates/words_per_year_tooltip.html.ejs'}),
  },
  Authors: {
    'guterres': 'Antonio Guterres',
    'lubbers': 'Rudd Lubbers',
    'ogata': 'Sadako Ogata',
    'stoltenberg': 'Thorvald Stoltenberg',
    'hocké': 'Jean-Pierre Hocké',
    'hartling': 'Poul Hartling',
    'khan': 'Sadruddin Aga Khan',
    'schnyder': 'Félix Schnyder',
    'lindt': 'Auguste Lindt',
    'Goedhart': 'Gerrit Jan van Heuven Goedhart'
  }
};

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

