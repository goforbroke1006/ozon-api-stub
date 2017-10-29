"use strict";

let express = require('express'),
    reg = require('regex'),
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
        res.json({Status:1, Error: error});
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
            ClientDiscountCodeApplyForWeb:
                promo,
                Discount: promo.Discount,
        }))
        .catch((err) => {
            res.json({
                Status: 1,
                Error: err.message
            })
        });
});

module.exports = router;