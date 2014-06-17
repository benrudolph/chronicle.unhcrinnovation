Diction.Figures.FreqChart = Backbone.View.extend({

  tooltipTemplate: new EJS({ url: '/templates/tooltip.html.ejs' }),

  sentencesTemplate: new EJS({ url: '/templates/sentences.html.ejs' }),

  initialize: function(attrs) {
    var defaults = {
      height: 440,
      svg: d3.select('#figure'),
      data: [],
      margin: { top: 10, bottom: 20, left: 50, right: 180 },
      docs: new Diction.Collections.Doc()
    };

    _.defaults(this, attrs, defaults);

    this.docHash = {};

    this.docs.each(function(doc) {
      this.docHash[doc.get('documentId')] = doc;
    }.bind(this));

    this.width = this.docs.length;

    this.x = d3.scale.ordinal()
      .domain(this.docs.map(function(d, i) { return d.get('documentId'); }))
      .range(this.docs.map(function(d, i) { return i; }));

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .tickFormat('')
      .tickSize(0);

    this.tippedEl = null;

    this.g = this.svg.append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.height = this.height - this.margin.top - this.margin.bottom;

    this.y = d3.scale.linear()
      .domain([0, 50])
      .range([this.height, 0]);

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .ticks(5)
      .orient("left")
      .tickSize(-this.width, 0, 0)
      .tickPadding(8);

    this.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + this.height + ')')
      .call(this.xAxis);

    this.g.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis);

    $.subscribe('scroll', function() {
      if (this.tippedEl) {
        var $el = $(this.tippedEl);
        var d = $el[0].__data__;
        $el.tipsy('show');
        $('.tipsy-back').on('click', function() { this.onReturn(d, $el); }.bind(this));
        $('.tipsy-show a').on('click', function() { this.onShowSentences(d, $el); }.bind(this));
      }
    }.bind(this));

    $.subscribe('tipsy.hide', function() {
      if (this.tippedEl) {
        $(this.tippedEl).tipsy('hide');
        this.tippedEl = null;
      }
    }.bind(this));

    // Legend

    var self = this;
    var legend = this.g.append('g').attr('class', 'legend')
      .attr('transform', function(d, i) {
        return 'translate(' + (this.width + 10) + ',10)';
      }.bind(this));

    var legendRectLength = 10;
    var legendRectPadding = 2;

    var legendLabels = legend.selectAll('.legend-label').data(Diction.authors.models);
    legendLabels.enter().append('g');
    legendLabels
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * (legendRectLength + (2 * legendRectPadding)) + ')';
      })
      .each(function(d) {
        var g = d3.select(this);
        g.append('rect')
          .attr('class', d.cssClass() + ' legend-rect')
          .attr('x', 4)
          .attr('y', 2)
          .attr('width', legendRectLength)
          .attr('height', legendRectLength);

        g.append('text')
          .attr('x', legendRectLength + (4 * legendRectPadding))
          .attr('y', legendRectLength)
          .attr('class', 'svg-label')
          .text(d.get('fullname'));


      });


  },

  render: function() {
    var x = this.x,
        y = this.y,
        self = this,
        docHash = this.docHash;



    if (this.tippedEl) {
      $(this.tippedEl).tipsy('hide');
    }

    // Actual bars
    max = d3.max(this.data, function(d) { return d.count; }) || 0;
    if (max < 30)
      max = 30;
    else
      max += (max * (2 / 5));

    y.domain([0, max]);
    var bars = this.g.selectAll('.bar').data(this.data.sort(this.compare.bind(this)), function(d) {
      return d.documentId;
    });
    bars.enter().append('rect')
      .attr('y', y(0))
      .attr('height', 0);
    bars
      .attr('class', function(d, i) {
        var author = Diction.authors.get(docHash[d.documentId].get('author'));
        return ['bar', d.documentId, author.cssClass()].join(' ');
      })
      .attr('original-title', function(d) {
        return self.tooltipTemplate.render(_.extend(d, docHash[d.documentId].toJSON()));
      })
      .transition()
      .duration(Diction.Constants.DURATION)
        .delay(function(d, i) { return i * 2; })
        .attr('height', function(d, i) {
          return y(0) - y(d.count);
        })
        .attr('y', function(d, i) { return y(d.count); })
        .attr('x', function(d, i) { return x(d.documentId); })
        .attr('width', function(d, i) { return 1; });

    bars.on('mouseover', function(d) {
      $.publish('tipsy.hide');
      $el = $(this);
      $el.tipsy('show');

      // Overrive pointer-events in style sheet
      $('.tipsy').addClass('clickable');

      // Show sentences on tooltip click
      $('.tipsy-show a').on('click', function() { self.onShowSentences(d, $el) }.bind(self));

      self.tippedEl = this;
    });

    bars.exit()
      .transition()
      .duration(Diction.Constants.DURATION)
      .attr('height', 0)
      .attr('y', y(0))
      .remove();

    this.g.select('.y.axis')
      .transition()
      .duration(Diction.Constants.DURATION)
      .call(this.yAxis);



    $('.bar').tipsy({
      html: true,
      trigger: 'manual',
      gravity: 's'
    });
  },

  compare: function(a, b) {
    return new Date(this.docHash[b.documentId].get('date')) - new Date(+this.docHash[a.documentId].get('date'));
  },

  onShowSentences: function(d, $el) {
    NProgress.start();
    $.get('/sentences', { word: d.word, documentId: d.documentId }, function(sentences) {
      $el.attr('original-title', this.sentencesTemplate.render({
        sentences: sentences
      }));
      $el.tipsy('show');

      // Return to normal tooltip
      $('.tipsy-back').on('click', function() { this.onReturn(d, $el); }.bind(this));

      NProgress.done();
    }.bind(this));

  },

  onReturn: function(d, $el) {
    var html = this.tooltipTemplate.render(_.extend(d, this.docHash[d.documentId].toJSON()));
    $el.attr('original-title', html);
    $el.tipsy('show');
    $('.tipsy-show a').on('click', function() { this.onShowSentences(d, $el); }.bind(this));
  },

  dataFn: function(_data) {
    if (arguments.length) {
      this.data = _data;
      return this;
    }
    return this.data;
  }




});
