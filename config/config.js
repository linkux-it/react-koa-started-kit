/**
 * Config file used to setup any variable here.
 *
 * Will be available to all app when required nconf
 *
 * Default should be set first and will be override
 * for args and env variables.
 *
 * Also use dot env file
 */
'use strict';

try {
  require('dotenv').load();
} catch (e) {
  /* handle error */
}

let path = require("path");

let nconf = require('nconf');

// Start default variables
let defaults = {
  ROOT_DIR: path.normalize(__dirname + '/..')
};


/*
 * Setup nconf to use (in order):
 *  1. Command-line arguments
 *  2. Environment variables
 */
nconf.argv().env();

nconf.defaults(defaults);
