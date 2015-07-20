/**
 * This file should configure koa
 * global middlewares or so
 */
'use strict';

let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let nconf = require('nconf');
let path = require('path');


module.exports = function (app) {
  // Logger
  app.use(logger());

  // Serve static files
  app.use(serve(path.join(nconf.get('ROOT_DIR'), 'public')));

  // Compress
  app.use(compress());
}

