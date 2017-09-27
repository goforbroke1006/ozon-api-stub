"use strict";

let express = require('express'),
    router = express.Router();

router.post('/ClientCheckEmail/', (req, res) => {
    const ClientModel = req.app.get("db").model("client");

    ClientModel.findOne({}).then(function (client) {
        res.json({
            Status: !!client ? 1 : 2,
            Error: !!client ? "Email already exists!" : null
        });
    }, function (err) {
        console.log(err);
    });
});

router.post('/PartnerClientRegistration/', (req, res) => {
    const ClientModel = req.app.get("db").model("client");
    let client = new ClientModel(req.body);
    let error = client.validateSync();
    if (!!error) {
        let errMsg = "";
        /*for (let prop in error.errors) {
            if (!error.errors.hasOwnProperty(prop)) continue;
            errMsg += error.errors[prop];
        }*/
        res.json({Status: 1, Error: errMsg});
        return;
    }
    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                client.save(function (err, client) {
                    if (err) reject(err);
                    else resolve(client);
                });
            });
        })
        .then((client) => res.json({Status: 2, Error: null}))
        .catch((err) => {
            res.json({
                Status: 1,
                Error: err.message
            })
        });
});

module.exports = router;