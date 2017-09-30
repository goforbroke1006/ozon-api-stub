"use strict";

let router = require("express").Router();

router.all("/*", (req, res, next) => {
    let guid = null;
    if (undefined !== req.query.guidValue)
        guid = req.query.guidValue;
    if (undefined !== req.body.guidValue)
        guid = req.body.guidValue;

    if (true !== req.url.endsWith("/CheckoutStart/")
        && (null === guid || 0 === guid.length)
    ) {
        next(new Error("You should specify valid guidValue"));
    }
    next();
});

module.exports = router;