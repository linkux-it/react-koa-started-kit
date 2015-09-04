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

require('dotenv').load();


import path from 'path';
import nconf from 'nconf';


// Start default variables
let defaults = {
  ROOT_DIR: path.normalize(path.join(__dirname, '/..'))
};


/*
 * Setup nconf to use (in order):
 *  1. Command-line arguments
 *  2. Environment variables
 */
nconf.argv().env();

nconf.defaults(defaults);

