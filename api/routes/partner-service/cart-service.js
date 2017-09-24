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

router.post('/CartAdd/', (req, res, next) => {
    let client = {
        partnerClientId: "fake-partner-client-id",
    };

    res.json({
        Status: 2,
        Url: `https://www.ozon.ru/PartnerOrder.aspx?partner=WILDFOWL&client=${client.partnerClientId}`
    }); // TODO: realize me!!
});

module.exports.router = router;