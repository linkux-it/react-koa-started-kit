/**
 * TODO: This is just for testing... Remove it whend needs
 *
 */
'use strict';
import React from 'react'
import views from 'co-views'
import parse from 'co-body'

import {HelloMessage} from 'components/hello-world.jsx'

// Put ready for server side
let ServerHelloMessage = React.createFactory(HelloMessage);

var messages = [
  { id: 0, message: 'Koa next generation web framework for node.js' },
  { id: 1, message: 'Koa is a new web framework designed by the team behind Express' }
];

var render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports.reactExample = function *reactExample() {
  this.body = yield render('layout', { 'reactHTML': React.renderToString(ServerHelloMessage({name: "John"})) });
};

module.exports.home = function *home() {
  this.body = yield render('list', { 'messages': messages });
};

module.exports.home = function *home() {
  this.body = yield render('list', { 'messages': messages });
};

module.exports.list = function *list() {
  this.body = yield messages;
};

module.exports.fetch = function *fetch(id) {
  var message = messages[id];
  if (!message) {
    this.throw(404, 'message with id = ' + id + ' was not found');
  }
  this.body = yield message;
};

module.exports.create = function *create() {
  var message = yield parse(this);
  var id = messages.push(message) - 1;
  message.id = id;
  this.redirect('/');
};

function doSomeAsync() {
  return function (callback) {
    setTimeout(function () {
      callback(null, 'this was loaded asynchronously and it took 3 seconds to complete');
    }, 3000);
  };
}

// One way to deal with asynchronous call
module.exports.delay = function *delay() {
  this.body = yield doSomeAsync();
};
