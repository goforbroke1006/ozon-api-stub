"use strict";

let express = require('express'),
    router = express.Router();

router.get('/CheckoutStart/', function (req, res, next) {
    if (req.body.partnerClientId === undefined || req.body.partnerClientId.length === 0) {
        res.status(401).json({Status: 1, Error: "You should specify valid partnerClientId"});
    }

    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

module.exports = router;