  Web Application Framework Using Express JS

```js
var webexapp = require('../lib'),
    WebServer = webexapp.WebServer;

var server;

server = new WebServer();
server.use('/hello', function (req, res) {
    res.send('hello world');
});
server.run();
```

## Installation

```bash
$ npm install webexapp
```

### Installation Dependencies

  * Node JS (v0.10.29+) - http://www.nodejs.org
  * Redis (v2.6.12+) - http://redis.io

## Features

  * Built upon Express JS web framework - https://github.com/strongloop/express
  * Multi-transport logging using Winston - https://github.com/flatiron/winston
  * Faster web using Compression - https://github.com/expressjs/compression
  * Cookies using Cookie-Parser - https://github.com/expressjs/cookie-parser
  * User sessions using Express-Session - https://github.com/expressjs/session
  * Session storage using Connect-Redis - https://github.com/visionmedia/connect-redis
  * JSON/URL-Encoded body parsing using Body-Parser - https://github.com/expressjs/body-parser
  * Default-body parsing using raw-body - https://github.com/stream-utils/raw-body
  * Load management using Toobusy-JS - https://github.com/STRML/node-toobusy
  * Usage limiting using Node-Ratelimter - https://github.com/visionmedia/node-ratelimiter
  * Security headers using Helmet - https://github.com/evilpacket/helmet

## Philosophy

  One of the many possible implementations of Web-App skeleton using Express JS
  including different middleware needed for any serious development effort.
  
  This is an attempt to provide a one-stop solution to get started...

## APIs

### Overview

  This module puts togethar different middleware to create a web-app framework, and
  provides different APIs to configure some of the middleware parameters. It also
  provides APIs to fine-tune some of the configuration parameters. The default 
  configurations are specified in respective setConfig details below. For more details
  regarding the configuration parameters, please view the documentation of the
  respective modules (see Features list above).

  Some of the modules used internally are made accessible to enable building apps.

  See examples folder for usage of different features.

### Logger-instance webexapp.loggerFactory.getLogger([name])

  Create a logger instance based on winston; 'name' defaults to the file-name where
  the instance is created. Four different levels are defined as:

  * debug
  * info
  * warn
  * error

### Logger-config webexapp.setLoggerConfig(options)

```js
webexapp.setRedisConfig({
    levels: {
        'debug': 0,
        'info': 1,
        'warn': 2,
        'error': 3
    },
    colors: {
        'debug': 'blue',
        'warn': 'yellow',
        'error': 'red',
        'info': 'green'
    },
    transports: [
        new(winston.transports.Console)({
            timestamp: true,
            colorize: true,
            json: true,
            level: 'debug'
        })
    ]
});
```

### Redis-config webexapp.setRedisConfig(options)

```js
webexapp.setRedisConfig({
    host: null, // localhost
    port: null, // 6379
    options: {} // none
});
```

### Sessions-config webexapp.setCookieSessionConfig(options)

```js
webexapp.setCookieSessionConfig({
    name: 'webappfx.sid',
    secret: 'secret sauce!',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    },
    redisPrefix: 'session:'
});
```

### Security-config webexapp.setSecurityConfig(options)

```js
webexapp.setSecurityConfig({
    features: { // enable or disable specific headers
        crossdomain: true,
        csp: true,
        hidePoweredBy: true,
        hsts: true,
        ienoopen: true,
        nocache: true,
        nosniff: true,
        xframe: true,
        xssFilter: true
    },
    csp: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'http://www.google-analytics.com', 'http://placehold.it'],
        scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'http://ajax.googleapis.com', 'http://www.google-analytics.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        frameSrc: ["'self'", 'https://maps.google.com', 'https://www.google.com/maps/embed'],
    },
    xframe: 'sameorigin'
});
```

### Limits-config webexapp.setLimitsConfig(options)

```js
webexapp.setLimitsConfig({
    // rate-limiting: max-requests in a given duration
    requestsMax: 2500,
    requestsDuration: 3600000,
    // server-load: max-lag allowed between callbacks
    maxLag: 1000
});
```

### BodyParsing-config webexapp.setBodyParserConfig(options)

  The parsed body is available as req.body in case of JSON & URL-Encoded bodies.
  For other types, the body is available as a stream in req.rawBodyStream which
  can be pipe'd to other body-parsing modules like [busboy](https://github.com/mscdex/busboy)

```js
webexapp.setBodyParserConfig({
    jsonLimit: '10kb', // JSON body-limit
    urlencodedLimit: '10kb', // URLEncoded body-limit
    rawLimit: '100kb' // all other-types body-limit
});
```

### WebServer-config webexapp.setWebserverConfig(options)

```js
webexapp.({
    // 0: as many cores; or, set non-zero 
    workers: 0,
    // server will run with following uid & gid
    setuid: 'ubuntu', 
    setgid: 'ubuntu',
    // listen on this port
    port: 8080
});
```

### WebServer-instance webexapp.WebServer([name])

```js
var webexapp = require('../lib'),
    WebServer = webexapp.WebServer;

var server;

server = new WebServer(); // optional name defaults to 'webserver'
server.use('/hello', function (req, res) {
    res.send('hello world');
});
server.run();
```

### Modules

  Some useful modules are export'ed from the main-module.

```js
var webexapp = require('../lib'),
    express = webexapp.express,
    redis = webexapp.redis,
    winston = webexapp.winston;
```

## License

  [MIT](LICENSE)
