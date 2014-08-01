'use strict';

var config = {
    name: 'webappfx.sid',
    secret: 'secret sauce!',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    },
    redisPrefix: 'session:'
};

function setConfig(cfg) {
    'name secret resave saveUninitialized cookie redisPrefix'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;