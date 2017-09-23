"use strict";

let express = require('express'),
    router = express.Router();

router.post('/ClientCheckEmail/', function (req, res, next) {
    res.json({message: "Hello =)!"}) // TODO: realize me!!
});

router.post('/PartnerClientRegistration/', function (req, res, next) {
    res.json({message: "Hello =)!"}) // TODO: realize me!!
});

module.exports = router;