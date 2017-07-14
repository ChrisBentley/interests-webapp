const interestsHandler = require('./handlers.js');

var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

let request = new MockExpressRequest;
let response = new MockExpressResponse;
let next = function() {};

describe('Testing interests route handler', () => {

    beforeEach(() => {
        // console.log('beforeEach ran');
    });

    afterEach(() => {
        // console.log('afterEach ran');
    });

    it('should return a 200 and the interests page text', () => {
        interestsHandler.getInterests(request, response, next);

        expect(response.statusCode).to.equal(200);
        expect(response._getString()).to.equal('Interests are as follows: ...');
    });
});
