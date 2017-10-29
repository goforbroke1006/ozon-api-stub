"use strict";

let router = require("express").Router(),
    reg = require('regex');

router.post("/ClientCheckEmail/", (req, res) => {
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

router.post("/PartnerClientRegistration/", (req, res) => {
    const ClientModel = req.app.get("db").model("client");

    // get client data from POST request body
    let client = new ClientModel(req.body);
    let error = client.validateSync();
    if (!!error) {
        let errMsg = "";
        res.json({Status: 1, Error: errMsg});
        return;
    }
    Promise.resolve()
    // save to DB
        .then(() => {
            return new Promise((resolve, reject) => {
                client.save(function (err, client) {
                    if (err) reject(err);
                    else resolve(client);
                });
            });
        })
        // send response
        .then((client) => res.json({Status: 2, Error: null}))
        // send response with error description
        .catch((err) => {
            res.json({
                Status: 1,
                Error: err.message
            })
        });
});

router.post('/ClientDiscountCodeApply', (req, res) => {
    let re = /(\d+)$/;
    let code = req.body.code;
    let discount = Number(code.match(re)[0]);

    const DiscountModel = req.app.get('db').model('discountcode');
    let disc = new DiscountModel();
    disc.CodeName = code;
    disc.Discount = discount;

    let error = disc.validateSync();
    if (error) {
        res.json({Status: 1, Error: error});
        return;
    }
    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                disc.save(function (err, disc) {
                    if (err) reject(err);
                    else resolve(disc);
                });
            });
        })
        .then((disc) => res.json({
            Status: 2,
            Error: null,
            ClientDiscountCodeApplyForWeb: {
                Discount: 0,
                Result: 0,
                DiscountValue: disc.Discount,
                Moment: Date.now(),
                Message: "В течение 5 минут мы зачислим" + disc.Discount + "Р на ваш пользовательский счёт.",
            }
        }))
        .catch((err) => {
            res.json({
                Status: 1,
                Error: err.message
            })
        });
});

module.exports = router;