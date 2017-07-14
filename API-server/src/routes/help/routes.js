module.exports = function (server) {
	const handlers = require('./handlers.js');

    server.get('/help', handlers.help);
};