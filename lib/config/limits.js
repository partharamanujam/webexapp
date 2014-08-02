'use strict';

var config = {
    requestsMax: 2500,
    requestsDuration: 3600000,
    maxLag: 1000
};

function setConfig(cfg) {
    'requestsMax requestsDuration maxLag'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;
