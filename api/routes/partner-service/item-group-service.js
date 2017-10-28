"use strict";

let express = require("express"),
    router = express.Router();

router.get("/ItemsRecursiveGet/", (req, res) => {
    res.json({
        Status: 2,
        TotalItems: [],
        GoodsItems: [],
    });
});

module.exports.router = router;