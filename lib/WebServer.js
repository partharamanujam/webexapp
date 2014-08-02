'use strict';

var http = require('http'),
    cluster = require('cluster'),
    os = require('os'),
    express = require('express'),
    expressWinston = require('express-winston'),
    winstonExpress = require('winston-express'),
    toobusy = require('toobusy-js'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    helmet = require('helmet'),
    redis = require('redis'),
    Limiter = require('ratelimiter'),
    ms = require('ms'),
    bodyParser = require('body-parser'),
    getRawBody = require('raw-body'),
    streamifier = require('streamifier'),
    config = require('./config'),
    loggerConfig = config.logger.config,
    cookiesessionConfig = config.cookiesession.config,
    redisConfig = config.redis.config,
    securityConfig = config.security.config,
    limitsConfig = config.limits.config,
    webserverConfig = config.webserver.config,
    bodyparserConfig = config.bodyparser.config,
    loggerFactory = require('./loggerFactory');

function runServer(that) {
    var server, app = express(),
        redisClient = redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options),
        expressLogger = expressWinston.logger({
            transports: loggerConfig.transports,
            statusLevels: true
        });
    // enable logging
    winstonExpress(app, loggerFactory.getLogger('browser'));
    app.use(expressLogger);
    // setup middleware
    toobusy.maxLag(limitsConfig.maxLag);
    app.use(function (req, res, next) {
        if (toobusy()) {
            res.send(503, 'Server Busy');
        } else {
            next();
        }
    });
    app.use(compression());
    app.use(cookieParser());
    app.use(session({
        name: cookiesessionConfig.name,
        secret: cookiesessionConfig.secret,
        resave: cookiesessionConfig.resave,
        saveUninitialized: cookiesessionConfig.saveUninitialized,
        cookie: cookiesessionConfig.cookie,
        store: new RedisStore({
            host: redisConfig.host,
            port: redisConfig.port,
            prefix: cookiesessionConfig.redisPrefix
        })
    }));
    app.use(helmet(securityConfig.features));
    if (securityConfig.features.csp) {
        app.use(helmet.csp(securityConfig.csp));
    }
    if (securityConfig.features.xframe) {
        app.use(helmet.xframe(securityConfig.xframe));
    }
    if (securityConfig.features.hidePoweredBy) {
        app.use(function (req, res, next) {
            var send = res.send;
            res.send = function () {
                res.removeHeader('X-Powered-By');
                send.apply(res, arguments);
            };
            next();
        });
    }
    app.use(function (req, res, next) {
        var limiter = new Limiter({
            id: req.sessionID,
            db: redisClient,
            max: limitsConfig.requestsMax,
            duration: limitsConfig.requestsDuration
        });
        limiter.get(function (err, limit) {
            if (err) {
                return next(err);
            }
            res.set('X-RateLimit-Limit', limit.total);
            res.set('X-RateLimit-Remaining', limit.remaining);
            res.set('X-RateLimit-Reset', limit.reset);
            if (limit.remaining) {
                return next();
            }
            that._logger.warn('Rate-limit info', limit);
            /*jshint bitwise: false*/
            var delta = (limit.reset * 1000) - Date.now() | 0;
            var after = limit.reset - (Date.now() / 1000) | 0;
            /*jshint bitwise: true*/
            res.set('Retry-After', after);
            res.send(429, 'Rate limit exceeded, retry in ' + ms(delta, {
                long: true
            }));
        });
    });
    app.use(bodyParser.json({
        limit: bodyparserConfig.jsonLimit
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: bodyparserConfig.urlencodedLimit
    }));
    app.use(function (req, res, next) {
        getRawBody(req, {
            length: req.headers['content-length'],
            limit: bodyparserConfig.rawLimit
        }, function (err, buffer) {
            if (!err) {
                req.rawBodyStream = streamifier.createReadStream(buffer);
            }
            next(err);
        });
    });
    // setup apps
    app.use(that._apps);
    // start server
    server = http.createServer(app);
    server.listen(webserverConfig.port);
    server.on('error', function (err) {
        that._logger.error('web-server error - ' + err);
    });
    server.on('listening', function () {
        if (process.setgid && process.setuid) {
            try {
                process.setgid(webserverConfig.setgid);
                process.setuid(webserverConfig.setuid);
            } catch (err) {
                that._logger.warn('webserver failed to set gid/uid: ' + err);
            }
        }
        that._logger.info('webserver started');
    });
    server.on('close', function () {
        that._logger.info('webserver stopped');
    });
}

function WebServer(name) {
    // ensure object is instantiated via new
    if (false === (this instanceof WebServer)) {
        throw new TypeError('attempt to create object without new()');
    }
    // call parent constructor
    Object.call(this);
    // init
    this._name = name || 'webserver';
    this._logger = loggerFactory.getLogger(name);
    this._apps = express();
}

WebServer.prototype.use = function () {
    var args = Array.prototype.slice.call(arguments);
    this._apps.use.apply(this._apps, args);
};

WebServer.prototype.run = function () {
    var idx, that = this,
        workers = webserverConfig.workers || os.cpus().length;
    if (workers === 1) {
        runServer(that);
    } else {
        if (cluster.isMaster) {
            cluster.on('fork', function (w) {
                that._logger.info('forking http-worker: #' + w.id +
                    ' (' + w.process.pid + ')');
            });
            cluster.on('online', function (w) {
                that._logger.info('http-worker #' + w.id + ' is online');
            });
            cluster.on('listening', function (w, addr) {
                that._logger.info('http-worker #' + w.id +
                    ' is connected to ' + addr.address + ':' + addr.port);
            });
            cluster.on('disconnect', function (w) {
                that._logger.info(': http-worker #' + w.id +
                    ' has dis-connected');
            });
            cluster.on('exit', function (w) {
                that._logger.info('http-worker #' + w.id +
                    ' has exited with code: ' + w.process.exitCode);
                cluster.fork();
            });
            for (idx = 0; idx < workers; idx++) {
                cluster.fork();
            }
        } else {
            runServer(this);
        }
    }
};

// exports
module.exports = WebServer;