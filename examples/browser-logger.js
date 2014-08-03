'use strict';

var path = require('path'),
    webexapp = require('../lib'),
    WebServer = webexapp.WebServer;

var server;

//webexapp.setWebserverConfig({workers: 1}); // set number of workers to 1
server = new WebServer('browser-logger');
server.use('/log', function (req, res) {
    res.sendfile(path.normalize(__dirname + '/page.html'));
});
server.run();

// access /log from browser
