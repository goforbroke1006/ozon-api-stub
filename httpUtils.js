"use strict";

module.exports = {
    getRequestParam: function (req, paramName, defaultVal = null) {
        if (undefined !== req.body[paramName])
            return req.body[paramName];
        if (undefined !== req.query[paramName])
            return req.query[paramName];
        return defaultVal;
    }
};