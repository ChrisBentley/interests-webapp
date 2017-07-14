const { JSDOM } = require('jsdom');

const win = new JSDOM('<!doctype html><body></body></html>');
const doc = win.window;

global.window = win;
global.doc = doc;

const chai = require('chai');
let sinonChai = require('sinon-chai');
chai.use(require('chai-as-promised'));
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = require('sinon');
