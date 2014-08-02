'use strict';

var config = {
    workers: 0, // 0: as many cores
    setuid: 'ubuntu',
    setgid: 'ubuntu',
    port: 8080
};

function setConfig(cfg) {
    'workers setuid setgid port'.split(/\s+/).forEach(function(key) {
        if (cfg[key]) {
            config[key] = cfg[key];
        }
    });
}

// exports
exports.config = config;
exports.setConfig = setConfig;
