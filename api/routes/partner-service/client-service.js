"use strict";

var
    mongoose = require('mongoose'),
    Client  = require("./../../models/client");

let express = require('express'),
    router = express.Router(),
    Promise = require('bluebird');


// ClientModel = require("./../../models/client");
// ClientModel = mongoose.;

router.post('/ClientCheckEmail/', async (req, res, next) => {
    Promise.resolve()
        .then(() => {
            ClientModel.findOne({email: req.body.email}).exec();
        })
        .then((client) => {
            res.json({
                Status: !!client ? 1 : 2,
                Error: !!client ? "Email already exists!" : null
            });
        })
        .catch((err) => console.error(err.stack));
});


router.get('/ClientCheckEmail/', async (req, res, next) => {
    // var Client = mongoose.model('Client', ClientModel);

    /*ClientModel.findOne({email: "ChuckNorris@ChuckNorris.ChuckNorris"}).exec()
        .then(function (client) {
            res.json({
                Status: !!client ? 1 : 2,
                Error: !!client ? "Email already exists!" : null
            });
        });*/

    /*ClientModel.findOne({email: "ChuckNorris@ChuckNorris.ChuckNorris"}).exec(function (client) {
        res.json({
            Status: !!client ? 1 : 2,
            Error: !!client ? "Email already exists!" : null
        });
    });*/

    // var UserSchema = require("./../../models/client"); // Schema
    // var User = mongoose.Model('Client', UserSchema); // Model

    // let ClientModel = mongoose.model('Client');
    // let ClientSchema = ClientModel.schema;

    // var promise = ClientModel.findOne({}).exec();

    /*Promise.resolve()
        .then(promise)
        /!*.then(() => {
            let client = new ClientModel({
                partnerClientId: 'Chuck-Norris',
                email: "ChuckNorris@ChuckNorris.ChuckNorris",
                clientPassword: "run",

                lastName: "Norris",
                firstName: "Chuck",
                middleName: "",

                SpamSubscribe: 1,
            });
            client.save();
        })
        .then(() => {
        })*!/
        .then((client) => {
            res.json({
                Status: !!client ? 1 : 2,
                Error: !!client ? "Email already exists!" : null
            });
        })
        .catch((err) => console.error(err.stack));*/

    /*Client.findOne({email: 'test@test.com'}, ok(function(user) {
        user.someArea = 'custom value';
        console.log(user.someArea);
        console.log('====');
        console.log(user);
    }));*/

    let query = Client.find({});
    query.exec((err, books) => {
        if(err) res.send(err);
        //если нет ошибок, отправить клиенту
        res.json(books);
    });
});

router.post('/PartnerClientRegistration/', (req, res, next) => {
    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

module.exports = router;