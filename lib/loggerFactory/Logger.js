'use strict';

var util = require('util'),
    winston = require('winston'),
    WinstonLogger = winston.Logger;

function setupLogger(logger) {
    var log = logger.log;
    logger.log = function() {
        var args = Array.prototype.slice.call(arguments);
        if(args[1] === undefined) {
            args[1] = '';
        }
        if (!args[2] || args[2].constructor !== {}.constructor) {
            args[2] = {};
        }
        args[2].id = logger._id;
        log.apply(logger, args);
    };
}

function Logger(id, config) {
    // ensure object is instantiated via new
    if (false === (this instanceof Logger)) {
        throw new TypeError('attempt to create object without new()');
    }
    // call parent constructor
    WinstonLogger.call(this, config);
    // init
    this._id = id;
    setupLogger(this);
}

// inherit from Object
util.inherits(Logger, WinstonLogger);

// exports
module.exports = Logger;