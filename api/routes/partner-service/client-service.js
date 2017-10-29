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

    const PromoModel = req.app.get('db').model('promo');
    let promo = new PromoModel();
    promo.PromoName = code;
    promo.Discount = discount;

    let error = promo.validateSync();
    if (error) {
        res.json({Status: 1, Error: error});
        return;
    }
    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                promo.save(function (err, promo) {
                    if (err) reject(err);
                    else resolve(promo);
                });
            });
        })
        .then((promo) => res.json({
            Status: 2,
            Error: null,
            ClientDiscountCodeApplyForWeb: {
                Discount: 0,
                Result: 0,
                DiscountValue: promo.Discount,
                Moment: "26.07.2017 11:42:42",
                Message: "В течение 5 минут мы зачислим <#PercentValue#> Р на ваш пользовательский счёт.",
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