'use strict';

var webexapp = require('../lib'),
    WebServer = webexapp.WebServer;

var server;

// creates as many workers as cores on the machine using cluster-module
server = new WebServer('multi-workers');
server.use('/hello', function (req, res) {
    res.send('hello world');
});
server.run();

// access /hello from browser
