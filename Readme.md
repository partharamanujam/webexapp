# INCOMPLETE - THIS IS WORK IN PROGRESS

  Web Application Framework Using Express JS


```js
var webexapp = require('webexapp');

var webserver = new webexapp.WebServer(),
    app = webexapp.expressApp();

app.get('/', function (req, res) {
  res.send('Hello World');
});

webserver.addApp('/', app);

webserver.run();
```

### Installation

```bash
$ npm install webexapp
```

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

### Installation Dependencies

  * Node JS - http://www.nodejs.org
  * Redis - http://redis.io

### Dependency Module Versions

  View package.jon file for versions of dependencies. 

## Philosophy

  One of the different possible implementations of Web-App skeleton including
  compatible middleware needed for any serious development effort.

## APIs

  TBD

## Configuration

  TBD

### License

  [MIT](LICENSE)