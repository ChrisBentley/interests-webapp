const express = require('express');
const path = require('path');


let server = module.exports = express();

server.use(require('express-promise')());

const attachRoutes = require('./routes/index');

attachRoutes(server);
// server.use(require('./routes/'));

server.use((req, res) => {
    res.status(404).send('404 Page Not Found');
});

//Handle error here
server.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send('500 Error');
});

if(!module.parent) {
    let serverPort = 4000;
    server.listen(serverPort, () => {
        console.log('API server listening on port: ' + serverPort);
    });
}
