/**
 * This file should configure koa
 * global middlewares or so
 */
'use strict';

import compress from 'koa-compress';
import logger from 'koa-logger';
import serve from 'koa-static';
import nconf from 'nconf';
import path from 'path';


export default function configureKoa (app) {
  // Logger
  app.use(logger());

  // Serve static files
  app.use(serve(path.join(nconf.get('ROOT_DIR'), 'public')));

  // Compress
  app.use(compress());
}

