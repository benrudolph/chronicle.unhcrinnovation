var Diction = {
  Constants: {
    ENTER: 13,
    DURATION: 1000,
    DEFAULT_QUERY: 'refugee'
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
};

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

