Diction.Figures.WordsPerYear = Backbone.View.extend({

  tooltipTemplate: Diction.Templates.wordsPerYearTooltip,

  initialize: function(attrs) {
    var defaults = {
      height: 300,
      width: 300,
      svg: d3.select('#word-count'),
      data: [],
      margin: { top: 10, bottom: 50, left: 50, right: 30 },
      word: null,
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
      .domain(d3.extent(Diction.docs.models, function(d) {
        return new Date(d.get('year'), 1);
      }))
      .range([0, this.width]);

    this.lineFn = d3.svg.line()
      .interpolate('cardinal')
      .x(function(d) { return this.x(new Date(d.year, 1)); }.bind(this))
      .y(function(d) { return this.y(d.perXWords); }.bind(this));


    this.voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [this.width, this.height]])
      .x(function(d) { return this.x(new Date(d.year, 1)); }.bind(this))
      .y(function(d) { return this.y(d.perXWords); }.bind(this));

    $.subscribe('scroll', function() {
      if (this.tippedEl)
        $(this.tippedEl).tipsy('show');
    }.bind(this));

    $.subscribe('tipsy.hide', function() {
      if (this.tippedEl) {
        $(this.tippedEl).tipsy('hide');
        this.tippedEl = null;
      }
    }.bind(this));
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

    var totalLength = line.node().getTotalLength();
    line
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('stroke-dashoffset', 0);

    var circles = this.g.selectAll('.word-circle').data(this.data);
    circles.enter().append('circle');
    circles.attr('class', function(d) { return ['word-circle', d.year].join(' '); })
      .attr('cx', function(d) { return x(new Date(d.year, 1)); })
      .attr('cy', function(d) { return y(d.perXWords); })
      .attr('original-title', function(d) {
        return self.tooltipTemplate.render(_.extend(d, { perWord: self.perXWords }));
      })
      .attr('r', 3);

    var path = this.g.selectAll('.voronoi').data(this.voronoi(this.data));
    path.enter().append('path');
    path.attr('class', function(d, i) {
        return ['voronoi', d.point.year].join(' ');
      })
      .attr('d', this.polygon);



    path
      .on('mouseover', function(d) {
        $.publish('tipsy.hide');

        $el = $('.words-per-year-' + self.word + ' .word-circle.' + d.point.year);
        $el.tipsy('show');
        self.tippedEl = $el[0];
      });

    $('.word-circle').tipsy({
      html: true,
      gravity: 's',
      trigger: 'manual',
      offset: 3
    });
  },

  polygon: function(d) {
    if (!d || !d.length)
      return "M0 0";
    return "M" + d.join("L") + "Z";
  }

});
