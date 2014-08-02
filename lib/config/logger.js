'use strict';

var winston = require('winston');

var config = {
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
};

function setConfig(cfg) {
    'levels colors transports'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;
