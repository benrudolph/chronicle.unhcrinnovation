Diction.Figures.FreqChart = Backbone.View.extend({

  tooltipTemplate: new EJS({ url: '/templates/tooltip.html.ejs' }),

  sentencesTemplate: new EJS({ url: '/templates/sentences.html.ejs' }),

  initialize: function(attrs) {
    var defaults = {
      height: 440,
      svg: d3.select('#figure'),
      data: [],
      margin: { top: 8, bottom: 40, left: 60, right: 100 },
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
      .call(this.yAxis)
      .append('text')
        .attr("transform", "rotate(-90)")
        .attr('class', 'axis-label')
        .attr("y", 12)
        .attr("x", -2)
        .attr("dy", "-.21em")
        .text('Word count');

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




    // AVERAGE LINE
    var avg = _.reduce(this.data, function(memo, doc) { return memo +  doc.count }, 0) / this.data.length;

    if (this.data.length === 0) {
      avg = 0;
    }

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
    if (this.data.length === 0) {
      max = { count: 0 };
    }

    var maxLine = this.g.selectAll('.max-line').data([max]);
    maxLine.enter().append('line');
    maxLine
      .attr('class', 'max-line ' + (max.author ? Diction.authors.get(max.author).cssClass() : ''))
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

    if (this.data.length === 0) {
      maxLabel.remove();
      avgLabel.remove();
    }


    this.updateResults(this.data);

    $('.bar').tipsy({
      trigger: 'manual',
    });
  },

  updateResults: function(data) {

    var sum = _.reduce(data, function(memo, d) { return memo + d.count; }, 0);
    var speechCount = _.uniq(data, function(d) { return d.documentId; }).length;
    $('#figure-container .current-word').text(this.query);
    $('#figure-container .occurences').text(Diction.Formats.COMMA(sum));
    $('#figure-container .speeches').text(speechCount);
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

    this.updateResults(filteredDocs);

    var avg = _.reduce(filteredDocs, function(memo, doc) { return memo +  doc.count }, 0) / filteredDocs.length;
    var max = _.max(filteredDocs, function(d) { return d.count; });

    if (filteredDocs.length === 0) {
      // make it disappear!
      avg = -500;
      max = { count: -500 };
    }

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
      .attr('class', 'max-line ' + (max.author ? Diction.authors.get(max.author).cssClass() : ''))
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
