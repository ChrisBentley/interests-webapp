module.exports = function (server) {
	const handlers = require('./handlers.js');

    server.get('/updateDb', handlers.updateDb);
};