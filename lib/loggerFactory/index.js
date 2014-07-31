'use strict';

var config = require('../config'),
    loggerConfig = config.logger,
    Logger = require('./Logger');

function extractModuleName() {
    var err = new Error('fake error to get module caller');
    try {
        return (/at .*\((\w:[^:]*|\\[^:]*)/).exec(err.stack.split("\n")[3])[1];
    } catch (e) {
        return "unknown";
    }
}

function setConfig(config) {
    loggerConfig = config;
}

function getLogger(id) {
    id = id || extractModuleName();
    return new Logger(id, loggerConfig);
}

// exports
exports.setConfig = setConfig;
exports.getLogger = getLogger;
