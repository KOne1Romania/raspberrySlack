'use strict';
// Browser ES6 Polyfill
require('babel/polyfill');

var jqueryMatchers    = require('jasmine-jquery-matchers');
var immutableMatchers = require('jasmine-immutable-matchers');

beforeEach(()=> {
  jasmine.addMatchers(jqueryMatchers)
  jasmine.addMatchers(immutableMatchers)
});

var context = require.context('./tests/spec', true, /\.test\.jsx$|\.test\.js$/);
context.keys().forEach(context);
