'use strict';

// Setup babel to use es6 till is supported at full
require('babel/register');

// Setting up react requirements
require('node-jsx').install({harmony: true, extension: 'jsx'});

let route = require('koa-route');
let koa = require('koa');
let app = module.exports = koa();

// Start configufation
require('./config/config');
require('./config/koa')(app);

let messages = require('controllers/messages');

app.use(route.get('/', messages.home));
app.use(route.get('/react', messages.reactExample));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));

// TODO: Define global errors handlers... do a better one!
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
