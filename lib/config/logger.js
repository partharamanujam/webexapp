'use strict';

var winston = require('winston');

module.exports = {
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