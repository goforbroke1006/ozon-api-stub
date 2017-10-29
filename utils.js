"use strict";

module.exports = {
    /**
     * Check value is string
     * @param {*} val
     * @returns {boolean}
     */
    isString: function (val) {
        return typeof val === "string" || val instanceof String
    },

    /**
     * Check value is empty
     * @param {*} val
     * @returns {boolean}
     */
    isEmpty: function (val) {
        if (undefined === val) return true;
        if (null === val) return true;
        if ((this.isString(val) || Array.isArray(val)) && 0 === val.length) return true;
        return false === (!!val);
    }
};