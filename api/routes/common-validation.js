"use strict";

const router = require("express").Router(),
    ExpressRequest = require("express/lib/request"),
    utils = require("./../../utils");

router.all("/*", (req, res, next) => {
    console.log(typeof req.__proto__);

    let login = utils.pullGetOrPostParameter(req, "login"),
        password = utils.pullGetOrPostParameter(req, "password");
    if (!utils.isString(login) || !utils.isString(password)) {
        next(new Error("You should to define your partner's login and password"));
    }
    else next();
});

router.all("/*", (req, res, next) => {
    let partnerClientId = utils.pullGetOrPostParameter(req, "partnerClientId");

    if (utils.isString(partnerClientId) && partnerClientId.length === 0) {
        let error = new Error("Unexpected empty partnerClientId");
        error.status = 401;
        next(error);
    }

    const ClientModel = req.app.get("db").model("client");

    ClientModel.findOne({
        partnerClientId: partnerClientId,
    }).then(function (client) {
        req.client = client;
        next();
    }, function (err) {
        console.log(err);
        next(new Error("Not found client with id = " + partnerClientId));
    });
});

module.exports = router;