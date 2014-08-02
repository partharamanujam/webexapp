'use strict';

var webexapp = require('../lib'),
    loggerFactory = webexapp.loggerFactory;


var logger = loggerFactory.getLogger(); // auto-detect module-name

logger.debug("this is debug msg");
logger.info("this is info msg");
logger.warn("this is warn msg");
logger.error("this is error msg");