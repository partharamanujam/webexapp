'use strict';

var webexapp = require('../lib'),
    express = require('express'),
    WebServer = webexapp.WebServer;

var server, app;

webexapp.setWebserverConfig({workers: 1}); // set number of workers to 1
server = new WebServer('body-parsing');

app = express();
app.post('/json', function (req, res) {
    res.send(JSON.stringify(req.body));
});
app.post('/urlencoded', function (req, res) {
    res.send(JSON.stringify(req.body));
});
app.post('/multipart', function (req, res) {
    // raw-stream available as req.rawBodyStream - pipe it something like busboy
    res.send('OK');
});

server.use('/', app);
server.run();

// POST to /json & /urlencoded
