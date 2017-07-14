module.exports = function (server) {
	const handlers = require('./handlers.js');

    server.get('/interests', handlers.getInterests);
};