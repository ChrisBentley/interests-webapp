const { JSDOM } = require('jsdom');

const win = new JSDOM('<!doctype html><body></body></html>');
const doc = win.window;

global.window = win;
global.doc = doc;

global.sinon = require('sinon');
