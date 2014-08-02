'use strict';

var winston = require('winston'),
    express = require('express'),
    redis = require('redis'),
    config = require('./config'),
    loggerFactory = require('./loggerFactory'),
    WebServer = require('./WebServer');

// exports
exports.winston = winston;
exports.express = express;
exports.redis = redis;
exports.setLoggerConfig = config.logger.setConfig;
exports.loggerFactory = loggerFactory;
exports.redis = redis;
exports.setRedisConfig = config.redis.setConfig;
exports.setCookieSessionConfig = config.cookiesession.setConfig;
exports.setSecurityConfig = config.security.setConfig;
exports.setBodyParserConfig = config.bodyparser.setConfig;
exports.setLimitsConfig = config.limits.setConfig;
exports.setWebserverConfig = config.webserver.setConfig;
exports.WebServer = WebServer;
