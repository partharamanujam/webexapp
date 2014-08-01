'use strict';

var config = require('./config'),
    winston = require('winston'),
    loggerFactory = require('./loggerFactory'),
    redis = require('redis');

// exports
exports.winston = winston;
exports.loggerFactory = loggerFactory;
exports.redis = redis;
exports.setRedisConfig = config.redis.setConfig;
exports.setCookieSessionConfig = config.cookiesession.setConfig;
exports.setSecurityConfig = config.security.setConfig;
