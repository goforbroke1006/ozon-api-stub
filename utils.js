"use strict";

module.exports = {

    /**
     * Check value is string
     * @param {*} val
     * @returns {boolean}
     */
    isString: function (val) {
        return (typeof val === "string" || val instanceof String);
    },

    /**
     * Get random number
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    /**
     * Get query or post parameter
     * @param {IncomingMessage} request
     * @param {String} name
     * @param {null|String|Number} defaultValue
     * @returns {null|String|Number}
     */
    pullGetOrPostParameter: function (request, name, defaultValue = null) {
        return request.query[name] || request.body[name] || defaultValue;
    }

};