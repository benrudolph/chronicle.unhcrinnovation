var cluster = require('cluster');
var nap = require('nap');

if (cluster.isMaster) {

  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }


} else {

  /**
   * Module dependencies.
   */

  var express = require('express');
  var routes = require('./routes');
  var http = require('http');
  var path = require('path');
  var db = require('./models');

  var app = express();

  // nap config
  nap({
    publicDir: 'public',
    assets: {
      js: {
        all: [
          '/public/javascripts/jquery.min.js',
          '/public/javascripts/jquery.tipsy.js',
          '/public/javascripts/scrollspy.js',
          '/public/javascripts/d3.js',
          '/public/javascripts/underscore.js',
          '/public/javascripts/backbone.js',
          '/public/javascripts/ejs.js',
          '/public/javascripts/skrollr.js',
          '/public/javascripts/pubsub.js',
          '/public/javascripts/nprogress.js',
          '/public/javascripts/diction.js',
          '/public/javascripts/models/*.js',
          '/public/javascripts/collections/*.js',
          '/public/javascripts/routers/*.js',
          '/public/javascripts/views/**/*.js',
          '/public/javascripts/figures/*.js',
        ]
      },
      css: {
        all: [
          '/public/stylesheets/bootstrap.css',
          '/public/stylesheets/nprogress.css',
          '/public/stylesheets/tipsy.css',
          '/public/stylesheets/style.css'
        ]
      },
    }
  });

  app.locals.nap = nap;

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app.get('/', routes.index);
  app.get('/search', routes.search);
  app.get('/popular_words', routes.popularWordsByAuthor);
  app.get('/sentences', routes.sentences);
  app.get('/words_per_year', routes.wordsPerYear);

  if ('development' === app.get('env')) {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
  } else if ('production' === app.get('env')) {
    nap.package(function() {
      http.createServer(app).listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
      });
    });
  }
}
