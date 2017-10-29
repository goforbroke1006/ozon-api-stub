"use strict";

let express = require('express'),
    router = express.Router();

/**
 * Parse string like "1:1,10:4,3:5" to map where key is item id and value is count of this item
 * @param {String} itemsStr - input string in special format
 * @returns {Array} - array of objects like {item: 12764, count: 12}
 */
let parseCartItems = (itemsStr) => {
    let items = [],
        itemsArr = itemsStr.replace(" ", "").split(",");
    for (let i = 0; i < itemsArr.length; i++) {
        let itemPart = itemsArr[i];
        if (itemPart.length === 0)
            continue;
        let data = itemPart.split(":");
        if (data.length !== 2) throw new Error('Bad cart items format!');
        items.push({
            item: parseInt(data[0]),
            count: parseInt(data[1]),
        });
    }
    return items;
};
module.exports.parseCartItems = parseCartItems;

router.get("/CartGet/", (req, res) => {
    res.json({
        Status: 2,
        CartItems: [],
        CartSummary: {
            ClientAccount: 0,
            Discount: 0,
            DoneMinDate: "15.06.17",
            FullSum: 3507,
            FullWeight: 2065,
            ItemQty: 0,
            ScoreToAdd: 0,
            ScoreToPay: 0,
            ScoreValue: 0,
            Sum: 3507,
        },
        DelayedCartItems: [],
        PreReleaseCartItems: [],
        PreReleaseCartSummary: {
            ClientAccount: 0,
            Discount: 0,
            DoneMinDate: null,
            FullSum: 0,
            FullWeight: 0,
            ItemQty: 0,
            ScoreToAdd: 0,
            ScoreToPay: 0,
            ScoreValue: 0,
            Sum: 0,
        },
        ProposalCartItems: [],
    });
});

router.post('/CartAdd/', (req, res, next) => {
    let client = {
        partnerClientId: "fake-partner-client-id",
    };

    res.json({
        Status: 2,
        Url: `https://www.ozon.ru/PartnerOrder.aspx?partner=WILDFOWL&client=${client.partnerClientId}`
    }); // TODO: realize me!!
});

router.post("/CartRemove/", function (req, res) {
    res.json({
        Status: 2,
    });
});

module.exports.router = router;