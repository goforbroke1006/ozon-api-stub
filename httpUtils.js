"use strict";

module.exports = {
    /**
     * Get value from body or query
     * @param req
     * @param {String} paramName
     * @param {*} defaultVal
     * @returns {*}
     */
    getRequestParam: function (req, paramName, defaultVal = null) {
        if (undefined !== req.body[paramName])
            return req.body[paramName];
        if (undefined !== req.query[paramName])
            return req.query[paramName];
        return defaultVal;
    }
};