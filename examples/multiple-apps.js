'use strict';

var webexapp = require('../lib'),
    express = require('express'),
    WebServer = webexapp.WebServer;

var server, app1, app2;

webexapp.setWebserverConfig({workers: 1}); // set number of workers to 1
server = new WebServer('multi-apps');

app1 = express();
app1.use('/whoami', function (req, res) {
    res.send('I am app #1');
});

app2 = express();
app2.use('/whoami', function (req, res) {
    res.send('I am app #2');
});

server.use('/app1', app1);
server.use('/app2', app2);

server.run();

// access /app1/whoami & /app2/whoami from browser
