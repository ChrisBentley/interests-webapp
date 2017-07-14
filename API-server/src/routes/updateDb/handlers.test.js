const updateDbHandler = require('./handlers.js');

var MockExpressRequest = require('mock-express-request');
var MockExpressResponse = require('mock-express-response');

let request = new MockExpressRequest;
let response = new MockExpressResponse;
let next = function() {};

describe('Testing updateDb route handler', () => {

    beforeEach(() => {
        // console.log('beforeEach ran');
    });

    afterEach(() => {
        // console.log('afterEach ran');
    });

    it('should return a 200 and the interests page text', () => {
        updateDbHandler.updateDb(request, response, next);

        expect(response.statusCode).to.equal(200);
        expect(response._getString()).to.equal('Database has been updated');
    });
});
