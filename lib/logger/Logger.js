'use strict';

var util = require('util'),
    winston = require('winston'),
    common = require('../common'),
    BaseObject = common.BaseObject;

function setupLogger(logger) {
    logger.addMethod('log', function(level, msg, meta) {
        if (!meta || meta.constructor !== {}.constructor) {
            meta = {};
        }
        meta.id = logger._id;
        logger._logger.log(level, msg, meta);
    });
    Object.keys(logger._config.levels).forEach(function(level) {
        logger.addMethod(level, function(msg, meta) {
            logger.log(level, msg, meta);
        });
    });
}

function Logger(id, config) {
    // ensure object is instantiated via new
    if (false === (this instanceof Logger)) {
        throw new TypeError('attempt to create object without new()');
    }
    // call parent constructor
    BaseObject.call(this);
    // init
    this._id = id;
    this._config = config;
    this._logger = new(winston.Logger)({
        transports: config.transports,
        levels: config.levels,
        colors: config.colors
    });
    setupLogger(this);
}

// inherit from Object
util.inherits(Logger, BaseObject);

// exports
module.exports = Logger;