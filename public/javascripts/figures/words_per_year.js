Diction.Figures.WordsPerYear = Backbone.View.extend({

  tooltipTemplate: Diction.Templates.wordsPerYearTooltip,

  initialize: function(attrs) {
    var defaults = {
      height: 300,
      width: 300,
      svg: d3.select('#word-count'),
      data: [],
      margin: { top: 10, bottom: 50, left: 25, right: 30 },
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

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .tickValues([new Date(1951, 1), new Date(1980, 1), new Date(2014, 1)])
      .tickFormat(function(d) { return d.getFullYear() });

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .ticks(4)
      .orient('left');

    this.lineFn = d3.svg.line()
      .interpolate('monotone')
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

    this.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + this.height + ')')
      .call(this.xAxis);

    this.g.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
        .attr("transform", "rotate(-90)")
        .attr('class', 'axis-label')
        .attr("y", 11)
        .attr("x", 0)
        .attr("dy", "-.21em")
        .text('Count per ' + this.perXWords + ' words');

    var authorData = _.sortBy(Diction.authors.models, function(d) { return -d.get('hc'); });

    var authors = this.g.selectAll('.author-rect').data(authorData);
    authors.enter().append('rect');
    authors.attr('class', function (d) {
        return ['author-rect', d.cssClass()].join(' ');
      })
      .attr('x', function(d) { return 0; }.bind(this))
      .attr('width', function(d) {
        var endDate = new Date(d.get('endYear') || 2014, 1);
        return this.x(endDate);
      }.bind(this))
      .attr('y', this.height - 3)
      .attr('height', 3);

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
        return self.tooltipTemplate.render(_.extend(d, { perWord: self.perXWords,
          author: self.findAuthorForYear(d.year) }));
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

        d = self.tippedEl.__data__;

        var crosshair = self.g.selectAll('.crosshair').data([d]);
        var author = self.findAuthorForYear(d.year);

        crosshair.enter().append('line');
        crosshair
          .attr('class', 'crosshair ' + author.cssClass())
          .attr('x1', self.x(new Date(d.year, 1)))
          .attr('x2', self.x(new Date(d.year, 1)))
          .attr('y1', self.y(d.perXWords))
          .attr('y2', self.y(0));
      });


    $('.word-circle').tipsy({
      html: true,
      gravity: 's',
      trigger: 'manual',
      offset: 3
    });
  },

  findAuthorForYear: function(year) {
    var authorData = _.sortBy(Diction.authors.models, function(d) { return d.get('hc'); });
    var author = _.find(authorData, function(author) {
      return author.get('endYear') > year;
    });

    if (!author)
      author = _.last(authorData);

    return author;

  },

  polygon: function(d) {
    if (!d || !d.length)
      return "M0 0";
    return "M" + d.join("L") + "Z";
  }

});
