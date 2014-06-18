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

    this.brush = d3.svg.brush()
      .x(this.x)
      .on("brush", this.brushed.bind(this));

    this.g.append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .selectAll('rect')
        .attr('y', 0)
        .attr('height', this.height);

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
    this.info = ['query', 'speeches', 'occurences'];

    // Legend

    var self = this;
    var legend = d3.select('#figure-container .legend-container').append('svg').attr('class', 'legend')

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


    this.g.selectAll(".brush").call(this.brush.clear());

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

    // Info labels
    var infoRects = this.g.selectAll('.info-rect').data(this.info);
    infoRects.enter().append('rect');
    infoRects.attr('class', 'info-rect')
      .attr('x', function(d, i) { return (i / self.info.length) * self.width; })
      .attr('y', 0)
      .attr('height', 30)
      .attr('width', this.width / this.info.length);


    var infoText = this.g.selectAll('.info-label').data(this.info);
    infoText.enter().append('text');
    infoText.attr('x', function(d, i) { return (i / self.info.length) * self.width + 8; })
      .attr('class', 'info-label')
      .attr('y', 0)
      .attr('dy', '1.4em')
      .text(function(d) {
        if (d == 'query') {
          return d + ': ' + self.query;
        } else if (d == 'occurences') {
          var sum = _.reduce(self.data, function(memo, d) { return memo + d.count; }, 0);
          return d + ': ' + Diction.Formats.COMMA(sum);
        } else {
          var speechCount = _.uniq(self.data, function(d) { return d.documentId; }).length;
          return d + ': ' + speechCount;
        }
      });

    // AVERAGE LINE
    var avg = _.reduce(this.data, function(memo, doc) { return memo +  doc.count }, 0) / this.data.length;
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
      .text('average: ' + avg.toFixed())
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y', function(d) { return y(d); });

    // MAX LINE
    var max = _.max(this.data, function(d) { return d.count; });
    var maxLine = this.g.selectAll('.max-line').data([max]);
    maxLine.enter().append('line');
    maxLine
      .attr('class', 'max-line ' + Diction.authors.get(max.author).cssClass())
      .attr('x1', this.x(max.documentId))
      .attr('x2', this.width)
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y1', function(d) { return y(d.count); })
        .attr('y2', function(d) { return y(d.count); });

    var maxLabel = this.g.selectAll('.max-label').data([max]);
    maxLabel.enter().append('text');
    maxLabel
      .attr('class', 'max-text')
      .attr('x', this.width + 10)
      .attr('text-anchor', 'start')
      .attr('dy', '.3em')
      .attr('class', 'svg-label max-label')
      .text('max: ' + max.count.toFixed())
      .transition()
      .duration(Diction.Constants.DURATION)
        .attr('y', function(d) { return y(d.count); });



    $('.bar').tipsy({
      trigger: 'manual',
    });
  },

  compare: function(a, b) {
    return new Date(this.docHash[b.documentId].get('date')) - new Date(+this.docHash[a.documentId].get('date'));
  },

  brushed: function() {
    var self = this;
    var extent = this.brush.extent();

    if (+extent[0] === +extent[1]) {
      extent = [0, this.width];
    }
    var filteredDocs = _.filter(self.data, function(doc) {
        var value = self.x(doc.documentId);
        return value >= extent[0] && value <= extent[1];
      })

    var infoText = this.g.selectAll('.info-label').data(this.info)
      .text(function(d) {
        if (d == 'query') {
          return d + ': ' + self.query;
        } else if (d == 'occurences') {
          var sum = _.reduce(filteredDocs, function(memo, d) { return memo + d.count; }, 0);
          return d + ': ' + Diction.Formats.COMMA(sum);
        } else {
          var speechCount = _.uniq(filteredDocs, function(d) { return d.documentId; }).length;
          return d + ': ' + speechCount;
        }
      });

    var avg = _.reduce(filteredDocs, function(memo, doc) { return memo +  doc.count }, 0) / filteredDocs.length;
    var max = _.max(filteredDocs, function(d) { return d.count; });

    var avgLine = this.g.selectAll('.avg-line').data([avg]);
    avgLine
      .attr('y1', function(d) { return this.y(d); }.bind(this))
      .attr('y2', function(d) { return this.y(d); }.bind(this));

    var avgLabel = this.g.selectAll('.avg-label').data([avg]);
    avgLabel
      .attr('y', function(d) { return this.y(d); }.bind(this))
      .text('average: ' + avg.toFixed());

    var maxLine = this.g.selectAll('.max-line').data([max]);
    maxLine
      .attr('class', 'max-line ' + Diction.authors.get(max.author).cssClass())
      .attr('x1', this.x(max.documentId))
      .attr('y1', function(d) { return this.y(d.count); }.bind(this))
      .attr('y2', function(d) { return this.y(d.count); }.bind(this));

    var maxLabel = this.g.selectAll('.max-label').data([max]);
    maxLabel
      .attr('y', function(d) { return this.y(d.count); }.bind(this))
      .text('max: ' + max.count.toFixed());

  },

  onShowSentences: function(d, $el) {
    NProgress.start();
    $.get('/sentences', { word: d.word, documentId: d.documentId }, function(sentences) {
      $el.attr('original-title', this.sentencesTemplate.render({
        sentences: sentences
      }));
      $el.tipsy('show');

      // Overrive pointer-events in style sheet
      $('.tipsy').addClass('clickable');

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

    // Overrive pointer-events in style sheet
    $('.tipsy').addClass('clickable');
  },

  dataFn: function(_data) {
    if (arguments.length) {
      this.data = _data;
      return this;
    }
    return this.data;
  },

  queryFn: function(_query) {
    if (arguments.length) {
      this.query = _query;
      return this;
    }
    return this.query;
  }




});
