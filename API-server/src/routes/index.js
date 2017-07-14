const main = require('./main/routes');
const help = require('./help/routes');
const interests = require('./interests/routes');
const updateDb = require('./updateDb/routes');


module.exports = function (server) {
	main(server);
	help(server);
    interests(server);
    updateDb(server);
};