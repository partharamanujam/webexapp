'use strict';

var config = require('../config'),
    Logger = require('./Logger');

function extractModuleName() {
    var err = new Error('fake error to get module caller');
    try {
        return (/at .*\((\w:[^:]*|\\[^:]*)/).exec(err.stack.split("\n")[3])[1];
    } catch (e) {
        return "unknown";
    }
}

function getLogger(id) {
    id = id || extractModuleName();
    return new Logger(id, config.logger.config);
}

// exports
exports.getLogger = getLogger;
