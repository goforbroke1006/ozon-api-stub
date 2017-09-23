"use strict";

let express = require('express'),
    router = express.Router();

router.post('/ClientCheckEmail/', function (req, res, next) {
    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

router.post('/PartnerClientRegistration/', function (req, res, next) {
    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

module.exports = router;