'use strict';

var webexapp = require('../lib'),
    WebServer = webexapp.WebServer;

var server;

webexapp.setWebserverConfig({workers: 1}); // set number of workers to 1
server = new WebServer('simple-server');
server.use('/hello', function (req, res) {
    res.send('hello world');
});
server.run();

// access /hello from browser
