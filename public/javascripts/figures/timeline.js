Diction.Figures.Timeline = Backbone.View.extend({

  tooltipTemplate: new EJS({ url: '/templates/doc_tooltip.html.ejs' }),

  initialize: function(attrs) {
    var defaults = {
      height: 300,
      width: 800,
      svg: d3.select('#timeline'),
      data: [],
      margin: { top: 10, bottom: 50, left: 50, right: 30 },
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

    this.y = d3.scale.linear()
      .domain([.2, -.2])
      .range([0, this.height]);

    this.yInterpolate = d3.scale.linear()
      .domain([.2, -.2])
      .range([0, 1]);

    this.colorInterpolate = d3.interpolateRgb('#c0392b', '#3498db');

    this.x = d3.time.scale()
      .domain(d3.extent(this.docs.models, function(d) {
        return new Date(+d.get('date'));
      }))
      .range([0, this.width])

    this.g.append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', this.y(0))
      .attr('y2', this.y(0));

    this.voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [this.width, this.height]])
      .x(function(d) { return this.x(new Date(+d.get('date'))); }.bind(this))
      .y(function(d) { return this.y(d.get('sentimentComp')); }.bind(this));


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
        r = this.r,
        self = this;


    var circles = this.g.selectAll('.timeline-circle').data(this.docs.models);
    circles.enter().append('circle')
      .attr('r', 0);

    circles.attr('class', function(d, i) {
        return ['timeline-circle', d.get('author'), d.get('documentId')].join(' ');
      })
      .attr('original-title', function(d) {
        return self.tooltipTemplate.render(d.toJSON());
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

    var path = this.g.selectAll('.voronoi').data(this.voronoi(this.docs.models));
    path.enter().append('path');
    path.attr('class', function(d, i) {
        return ['voronoi', d.point.get('author'), d.point.get('documentId')].join(' ');
      })
      .attr('d', this.polygon)
      .on('mouseover', function(d) {
        if (self.tippedEl) {
          d3.select(self.tippedEl).classed('highlight', false);
        }
        $.publish('tipsy.hide');
        $el = $('.timeline-circle.' + d.point.get('documentId'));
        $el.tipsy('show');

        //d3.select($el[0]).moveToFront();
        d3.select($el[0]).classed('highlight', true);

        self.tippedEl = $el[0];
      });

    $('.timeline-circle').tipsy({
      html: true,
      trigger: 'manual',
      gravity: 's',
      offset: 25
    });

  },

  polygon: function(d) {
    if (!d || !d.length)
      return "M0 0";
    return "M" + d.join("L") + "Z";
  }

});

