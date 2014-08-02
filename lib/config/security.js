'use strict';

var config = {
    middleware: {
        crossdomain: true,
        csp: true,
        hidePoweredBy: true,
        hsts: true,
        ienoopen: true,
        nocache: true,
        nosniff: true,
        xframe: true,
        xssFilter: true
    },
    csp: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'http://www.google-analytics.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", 'http://www.google-analytics.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        frameSrc: ["'self'", 'https://maps.google.com', 'https://www.google.com/maps/embed']
    },
    xframe: 'sameorigin'
};

function setConfig(cfg) {
    'csp xframe'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}
// exports
exports.config = config;
exports.setConfig = setConfig;
