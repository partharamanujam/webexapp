'use strict';

var config = {
    host: null, // localhost
    port: null, // 6379
    options: {}
};

function setConfig(cfg) {
    'host port options'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;
