"use strict";

let express = require("express"),
    router = express.Router(),
    httpUtils = require("./../../httpUtils"),
    utils = require("./../../utils");

// TODO: validate login & password API params


router.all("/*", (req, res, next) => {
    let partnerClientId = httpUtils.getRequestParam(req, "partnerClientId");

    if (utils.isEmpty(partnerClientId)) {
        let error = new Error("Unexpected empty partnerClientId");
        error.status = 401;
        next(error);
    }

    // TODO: get user from DB by partnerClientId and throw exception if not found!
    const client = null;

    if (null !== client) {
        // next(new Error('Not found client with id = ' + partnerClientId));
    }

    next();
});

module.exports = router;