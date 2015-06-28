'use strict';
let messages = require('./controllers/messages');
let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let route = require('koa-route');
let koa = require('koa');
let path = require('path');
let app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
