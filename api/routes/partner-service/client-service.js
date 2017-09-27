"use strict";

let express = require('express'),
    router = express.Router();

router.post('/ClientCheckEmail/', async (req, res) => {
    const Client = req.app.get('db').model('client');

    Client.findOne({}).then(function (client) {
        res.json({
            Status: !!client ? 1 : 2,
            Error: !!client ? "Email already exists!" : null
        });
    }, function (err) {
        console.log(err);
    });
});

router.post('/PartnerClientRegistration/', (req, res) => {
    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

module.exports = router;