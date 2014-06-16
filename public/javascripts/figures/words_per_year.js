Diction.Figures.WordsPerYear = Backbone.View.extend({

  initialize: function(attrs) {
    var defaults = {
      height: 300,
      width: 300,
      svg: d3.select('#word-count'),
      data: [],
      margin: { top: 10, bottom: 50, left: 50, right: 30 },
    };

    _.defaults(this, attrs, defaults);


    this.tippedEl = null;

    this.g = this.svg.append('svg')
      .attr("width", this.width)
      .attr("height", this.height)
      .attr('class', 'svg-words-per-year')
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.height = this.height - this.margin.top - this.margin.bottom;
    this.width = this.width - this.margin.left - this.margin.right;
    this.perXWords = 1000;

    _.each(this.data, function(d) {
      d.perXWords = (this.perXWords / d.totalCountPerYear) * d.wordCount;
    }.bind(this));

    this.y = d3.scale.linear()
      .domain([0, d3.max(this.data, function(d) {
        return d.perXWords;
      }.bind(this))])
      .range([this.height, 0]);

    this.x = d3.time.scale()
      .domain(d3.extent(this.data, function(d) {
        return new Date(d.year, 1);
      }))
      .range([0, this.width]);

    this.lineFn = d3.svg.line()
      .interpolate('basis')
      .x(function(d) { return this.x(new Date(d.year, 1)); }.bind(this))
      .y(function(d) { return this.y(d.perXWords); }.bind(this));


    this.voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [this.width, this.height]])
      .x(function(d) { return this.x(new Date(d.year, 1)); }.bind(this))
      .y(function(d) { return this.y(d.perXWords); }.bind(this));
  },

  render: function() {
    var x = this.x,
        y = this.y,
        self = this;

    var line = this.g.selectAll('.word-line').data([this.data]);
    line.enter().append('path');
    line.attr('class', function(d) {
        return ['word-line'].join(' ');
      })
      .attr('d', this.lineFn);

  }

});
