Diction.Figures.Timeline = Backbone.View.extend({

  tooltipTemplate: new EJS({ url: '/templates/doc_tooltip.html.ejs' }),

  initialize: function(attrs) {
    var defaults = {
      height: 400,
      width: 800,
      svg: d3.select('#timeline'),
      data: [],
      margin: { top: 30, bottom: 10, left: 110, right: 110 },
      docs: new Diction.Collections.Doc()
    };

    _.defaults(this, attrs, defaults);


    this.tippedEl = null;

    this.g = this.svg.append('svg')
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.r = d3.scale.sqrt()
      .domain([0, 20000])
      .range([2, 15])

    this.height = this.height - this.margin.top - this.margin.bottom;
    this.width = this.width - this.margin.left - this.margin.right;

    var domain = [.17, -.17];

    this.y = d3.scale.linear()
      .domain(domain)
      .range([0, this.height]);

    this.yHuman = d3.scale.linear()
      .domain(domain)
      .range([100, -100]);

    this.yInterpolate = d3.scale.linear()
      .domain(domain)
      .range([0, 1]);

    this.colorInterpolate = d3.interpolateRgb('#c0392b', '#3498db');

    this.x = d3.time.scale()
      .domain(d3.extent(this.docs.models, function(d) {
        return new Date(+d.get('date'));
      }))
      .range([0, this.width]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("top");

    this.g.append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', this.y(0))
      .attr('y2', this.y(0));

    this.g.append('text')
      .attr('y', this.y(0))
      .attr('x', -10)
      .attr('text-anchor', 'end')
      .attr('dy', '.3em')
      .attr('class', 'svg-label')
      .text('neutral');

    this.brush = d3.svg.brush()
      .x(this.x)
      .on("brush", this.brushed.bind(this));

    this.g.append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .selectAll('rect')
        .attr('y', 0)
        .attr('height', this.height);

    this.g.append('g')
      .attr('class', 'x axis')
      .call(this.xAxis);

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
      .attr('y', 0)
      .attr('height', 3);


  },

  render: function() {
    var x = this.x,
        y = this.y,
        r = this.r,
        self = this;


    var circles = this.g.selectAll('.timeline-circle').data(this.docs.models);
    circles.enter().append('circle')
      .attr('r', 0);

    circles.attr('class', function(d, i) {
        return ['timeline-circle', d.get('author'), d.get('documentId')].join(' ');
      })
      .attr('original-title', function(d) {
        return self.tooltipTemplate.render(_.extend({
          human: self.yHuman(d.get('sentimentComp')).toFixed() }, d.toJSON()));
      })
      .attr('cx', function(d) { return x(new Date(+d.get('date'))); })
      .attr('cy', function(d) { return y(d.get('sentimentComp')); })
      .style('fill', function(d) {
        return self.colorInterpolate(self.yInterpolate(d.get('sentimentComp')));
      })
      .transition()
      .duration(Diction.Constants.DURATION)
      .delay(function(d, i) { return 2 * i; })
        .attr('r', function(d) { return r(d.get('wordCount')); });

    circles.on('click', function(d) {
        window.open('http://www.unhcr.org/' + d.get('documentId') + '.html', '_blank')
      })
      .on('mouseover', function(d) {
        self.g.selectAll('.timeline-circle').classed('highlight', false);
        d3.select(this).classed('highlight', true);
      })
      .on('mouseleave', function(d) {
        d3.select(this).classed('highlight', false);
      });

    // AVERAGE LINE
    var avg = _.reduce(this.docs.pluck('sentimentComp'), function(memo, num) { return memo +  num }, 0) / this.docs.length;
    var avgLine = this.g.selectAll('.avg-line').data([avg]);
    avgLine.enter().append('line');
    avgLine
      .attr('class', 'avg-line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y1', function(d) { return y(d); })
        .attr('y2', function(d) { return y(d); });

    var avgLabel = this.g.selectAll('.avg-label').data([avg]);
    avgLabel.enter().append('text');
    avgLabel
      .attr('class', 'avg-text')
      .attr('x', this.width + 10)
      .attr('text-anchor', 'start')
      .attr('dy', '.3em')
      .attr('class', 'svg-label avg-label')
      .text('average: ' + this.yHuman(avg).toFixed())
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y', function(d) { return y(d); });

    $('.timeline-circle').tipsy({
      html: true,
      gravity: 's',
      offset: 25
    });

    // MAX LINE
    var max = this.docs.max(function(d) { return d.get('sentimentComp'); });
    var maxLine = this.g.selectAll('.max-line').data([max]);
    maxLine.enter().append('line');
    maxLine
      .attr('class', 'max-line')
      .attr('x1', this.x(new Date(+max.get('date'))))
      .attr('x2', this.width)
      .style('stroke', function(d) {
        return self.colorInterpolate(self.yInterpolate(d.get('sentimentComp')));
      })
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y1', function(d) { return y(d.get('sentimentComp')); })
        .attr('y2', function(d) { return y(d.get('sentimentComp')); });

    var maxLabel = this.g.selectAll('.max-label').data([max]);
    maxLabel.enter().append('text');
    maxLabel
      .attr('class', 'max-text')
      .attr('x', this.width + 10)
      .attr('text-anchor', 'start')
      .attr('dy', '.3em')
      .attr('class', 'svg-label max-label')
      .text('max: ' + this.yHuman(max.get('sentimentComp')).toFixed())
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y', function(d) { return y(d.get('sentimentComp')); });

    // MIN LINE
    var min = this.docs.min(function(d) { return d.get('sentimentComp'); });
    var minLine = this.g.selectAll('.min-line').data([min]);
    minLine.enter().append('line');
    minLine
      .attr('class', 'min-line')
      .attr('x1', this.x(new Date(+min.get('date'))))
      .attr('x2', this.width)
      .style('stroke', function(d) {
        return self.colorInterpolate(self.yInterpolate(d.get('sentimentComp')));
      })
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y1', function(d) { return y(d.get('sentimentComp')); })
        .attr('y2', function(d) { return y(d.get('sentimentComp')); });

    var minLabel = this.g.selectAll('.min-label').data([min]);
    minLabel.enter().append('text');
    minLabel
      .attr('class', 'min-text')
      .attr('x', this.width + 10)
      .attr('text-anchor', 'start')
      .attr('dy', '.3em')
      .attr('class', 'svg-label min-label')
      .text('min: ' + this.yHuman(min.get('sentimentComp')).toFixed())
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y', function(d) { return y(d.get('sentimentComp')); });


  },

  polygon: function(d) {
    if (!d || !d.length)
      return "M0 0";
    return "M" + d.join("L") + "Z";
  },

  brushed: function(d) {
    var self = this;
    var extent = this.brush.extent();
    var removeLabels = false
    if (+extent[0] === +extent[1]) {
      extent = this.x.domain();
      removeLabels = true;
    }
    var filteredDocs = _.filter(this.docs.models, function(doc) {
      var date = new Date(+doc.get('date'));
      return  date >= extent[0] && date <= extent[1];
    });
    var avg = _.reduce(filteredDocs, function(memo, doc) { return memo + doc.get('sentimentComp'); }, 0) / filteredDocs.length;

    var max = _.max(filteredDocs, function(d) { return d.get('sentimentComp'); });
    var min = _.min(filteredDocs, function(d) { return d.get('sentimentComp'); });

    if (!avg)
      return;

    var avgLine = this.g.selectAll('.avg-line').data([avg]);
    avgLine
      .attr('y1', function(d) { return this.y(d); }.bind(this))
      .attr('y2', function(d) { return this.y(d); }.bind(this));

    var avgLabel = this.g.selectAll('.avg-label').data([avg]);
    avgLabel
      .attr('y', function(d) { return this.y(d); }.bind(this))
      .text('average: ' + this.yHuman(avg).toFixed());

    var maxLine = this.g.selectAll('.max-line').data([max]);
    maxLine
      .attr('x1', this.x(new Date(+max.get('date'))))
      .attr('y1', function(d) { return this.y(d.get('sentimentComp')); }.bind(this))
      .attr('y2', function(d) { return this.y(d.get('sentimentComp')); }.bind(this));

    var maxLabel = this.g.selectAll('.max-label').data([max]);
    maxLabel
      .attr('y', function(d) { return this.y(d.get('sentimentComp')); }.bind(this))
      .text('max: ' + this.yHuman(max.get('sentimentComp')).toFixed());

    var minLine = this.g.selectAll('.min-line').data([min]);
    minLine
      .attr('x1', this.x(new Date(+min.get('date'))))
      .attr('y1', function(d) { return this.y(d.get('sentimentComp')); }.bind(this))
      .attr('y2', function(d) { return this.y(d.get('sentimentComp')); }.bind(this));

    var minLabel = this.g.selectAll('.min-label').data([min]);
    minLabel
      .attr('y', function(d) { return this.y(d.get('sentimentComp')); }.bind(this))
      .text('min: ' + this.yHuman(min.get('sentimentComp')).toFixed());

    if (removeLabels) {
      this.g.selectAll('.brush-label, .diff-label').remove();
      return;
    }

    var brushLabel = this.g.selectAll('.brush-label').data(extent);
    brushLabel.enter().append('text');
    brushLabel.attr('x', function(d, i) {
        return self.x(d) + (i === 0 ? -5 : 5 );
      })
      .attr('y', this.height - 5)
      .attr('class', 'brush-label svg-label')
      .attr('text-anchor', function(d, i) { return i === 0 ? 'end' : 'start'; })
      .text(function(d) { return Diction.Constants.MONTHS[d.getMonth()] + ' ' + d.getFullYear(); });

    var differenceLabel = this.g.selectAll('.diff-label').data([extent[1] - extent[0]]);
    differenceLabel.enter().append('text');
    differenceLabel.attr('x', function(d, i) {
        return self.x(new Date(extent[1] - ((extent[1] - extent[0]) / 2)));
      })
      .attr('y', this.height - 20)
      .attr('class', 'diff-label svg-label')
      .attr('text-anchor', function(d, i) { return 'middle' })
      .text(function(d) {
        var value,
            months,
            years;
        // seconds
        value = d / 1000;

        // minutes
        value /= 60;

        // hours
        value /= 60;

        // days
        value /= 24;

        // years
        years = value / 365;

        // months
        months = value / 30.5;

        if (years > 1)
          return years.toFixed(1) + ' years';
        else
          return months.toFixed() + ' months';

      });


  }

});

