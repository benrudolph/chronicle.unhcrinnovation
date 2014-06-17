Diction.Figures.Author = Backbone.View.extend({
  initialize: function(attrs) {
    var defaults = {
      height: 200,
      width: 190,
      data: [],
      margin: { top: 10, bottom: 10, left: 10, right: 100 },
      author: new Diction.Models.Author()
    };

    _.defaults(this, attrs, defaults);

    this.barPadding = 5;


    this.g = this.svg.append('svg')
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.height = this.height - this.margin.top - this.margin.bottom;
    this.width = this.width - this.margin.left - this.margin.right;

    this.maxBars = 10;

    this.stopWords = ['i', 'the', 'in', '000', 'mr', 'we', 'it'];

    this.data = _.filter(this.data, function(d) {
      return this.stopWords.indexOf(d.raw) === -1;
    }.bind(this));

    this.data = this.data.slice(0, this.maxBars);

    this.x = d3.scale.linear()
      .domain([0, d3.max(this.data, function(d) { return +d.wordCount; })])
      .range([0, this.width]);

    this.y = d3.time.scale()
      .domain([0, this.maxBars])
      .range([0, this.height]);
  },

  render: function() {
    var x = this.x,
        y = this.y,
        self = this;

    console.log(x.range());

    var bars = this.g.selectAll('.word-bar').data(this.data);
    bars.enter().append('rect')
      .attr('x', x(0))
      .attr('width', 0);

    bars.attr('class', function(d, i) {
        return ['word-bar', d.author].join(' ');
      })
      .transition()
      .duration(Diction.Constants.DURATION)
        .delay(function(d, i) { return i * 2; })
        .attr('x', function(d, i) { return x(0); })
        .attr('y', function(d, i) { return y(i); })
        .attr('width', function(d, i) { return x(+d.wordCount); })
        .attr('height', (this.height / this.maxBars) - this.barPadding);

    var labels = this.g.selectAll('.word-label').data(this.data);
    labels.enter().append('text')
      .attr('x', x(0))
      .attr('width', 0);

    labels.attr('class', function(d, i) {
        return ['word-label', 'label'].join(' ');
      })
      .transition()
      .duration(Diction.Constants.DURATION)
        .delay(function(d, i) { return i * 2; })
        .attr('x', function(d, i) { return x(+d.wordCount) + 4; })
        .attr('y', function(d, i) { return y(i); })
        .attr('text-anchor', 'start')
        .attr('dy', '.9em')
        .text(function(d) { return d.raw; });

  },
});
