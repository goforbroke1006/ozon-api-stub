"use strict";

let express = require('express'),
    router = express.Router(),
    Promise = require('bluebird');

router.post('/ClientCheckEmail/', async (req, res, next) => {
    try {
        let db = req.app.get('db');
        // let client = null;
        // Promise.resolve()
        //     .then(() => {
        //         db = req.app.get('db');
        //         Promise.resolve(db);
        //     })
        //     .then(() => async () => {
        const [client] = await
            Promise.all([
                db.get(
                    "SELECT * FROM ps__client WHERE email=? LIMIT 1",
                    [req.body.email]
                )
            ]);
        res.json({
            Status: !!client ? 1 : 2,
            Error: !!client ? "Email already exists!" : null
        });
        // })
        // .catch((err) => console.error(err.stack));


        /*.then(() => {
            client = db.get("SELECT * FROM ps__client WHERE email = \"?\"",
                req.body.email);
            Promise.resolve(client);
        })*/
        /*.then(() => {
            res.json({
                Status: null !== client ? 1 : 2,
                Error: null !== client ? "Email already exists! " + client.email : null
            });
            // res.json(client);
        })*/

    } catch (err) {
        next(err);
    }
});

router.post('/PartnerClientRegistration/', (req, res, next) => {
    res.json({Status: 2, Error: null}) // TODO: realize me!!
});

module.exports = router;