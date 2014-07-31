'use strict';

var util = require('util');

function BaseObject() {
    // ensure object is instantiated via new
    if (false === (this instanceof BaseObject)) {
        throw new TypeError('attempt to create object without new()');
    }
    // call parent constructor
    Object.call(this);
}

// inherit from Object
util.inherits(BaseObject, Object);

// define addMethod
BaseObject.prototype.addMethod = function (name, handler) {
    Object.defineProperty(this, name, {
        configurable: false,
        enumerable: true,
        value: handler
    });
};

// exports
module.exports = BaseObject;