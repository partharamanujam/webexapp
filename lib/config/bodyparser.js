'use strict';

var config = {
    jsonLimit: '10kb',
    urlencodedLimit: '10kb',
    rawLimit: '100kb'
};

function setConfig(cfg) {
    'jsonLimit urlencodedLimit rawLimit'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;
