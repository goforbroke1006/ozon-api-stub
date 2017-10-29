"use strict";

const router = require("express").Router(),
    httpUtils = require("./../../httpUtils"),
    utils = require("./../../utils");

router.all("/*", (req, res, next) => {
    let login = utils.pullGetOrPostParameter(req, "login"),
        password = utils.pullGetOrPostParameter(req, "password");
    if (!utils.isString(login) || !utils.isString(password)) {
        next(new Error("You should to define your partner's login and password"));
    }
    else next();
});

router.all('/*', (req, res, next) => {
    if (
        req.originalUrl === "/PartnerService/ClientService/ClientCheckEmail/"
        || req.originalUrl === "/PartnerService/ClientService/PartnerClientRegistration/"
    ) {
        next();
        return;
    }

    let partnerClientId = httpUtils.getRequestParam(req, "partnerClientId");

    if ((utils.isEmpty(partnerClientId)) {
        let error = new Error('Unexpected empty partnerClientId');
        error.status = 401;
        next(error);
    }

    const ClientModel = req.app.get("db").model("client");

    ClientModel.findOne({
        partnerClientId: partnerClientId,
    }).then(function (client) {
        if (!client) {
            next(new Error("Not found client with id = " + partnerClientId));
            return;
        }

        req.client = client;
        next();
    }, function (err) {
        next(err);
    });
});

module.exports = router;