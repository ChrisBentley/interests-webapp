const mainHandler = require('./handlers.js');

var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

let request = new MockExpressRequest;
let response = new MockExpressResponse;
let next = function() {};

describe('Testing main route handler', () => {

    beforeEach(() => {
        // console.log('beforeEach ran');
    });

    afterEach(() => {
        // console.log('afterEach ran');
    });

    it('should return a 302 and redirect to the help page', () => {
        mainHandler.main(request, response, next);

        expect(response.statusCode).to.equal(302);
        expect(response._getString()).to.equal('<p>Found. Redirecting to <a href="/help">/help</a></p>');
    });
});
