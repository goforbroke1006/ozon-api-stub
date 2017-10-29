"use strict";

let router = require("express").Router();

router.post("/ItemAvailabilitiesGet/", function (req, res) {
    res.json({
        Status: 2,
        ItemAvailabilities: [
            {
                Id: null,
                Name: null,
                Priority: null,
            }
        ],
    });
});

router.get("/ItemGet/", function (req, res, next) {
    const ItemModel = req.app.get("db").model("item");

    // console.log(req.query.ItemId);
    ItemModel.findOne({
        Id: parseInt(req.query.ItemId),
    }).then(function (item) {
        if (!item) next(new Error("Item not found!"));

        res.json({
            Status: 2, Item: {
                Annotation: item.Annotation,
                Author: item.Author,
                Availability: item.AvailableCount > 0 ? "Yes" : "No",
                AvailabilityDate: item.AvailabilityDate,
                BargainSale: item.BargainSale,
                ClientRating: item.ClientRating,
                ClientRatingCount: item.ClientRatingCount,
                Detail: item.Detail,
                DigitalTypeId: item.DigitalTypeId,
                Discount: item.Discount,
                DiscountPrice: item.DiscountPrice,
                Id: item.Id,
                InSuite: item.InSuite,
                IsNew: item.IsNew,
                IsSpecialPrice: item.IsSpecialPrice,
                ItemAvailabilityId: item.ItemAvailabilityId,
                ItemType: item.ItemType,
                ItemTypeId: item.ItemTypeId,
                LookInSide: item.LookInSide,
                Media: item.Media,
                Name: item.Name,
                Ordered: false,
                OtherName: item.OtherName,
                Path: item.Path,
                Price: item.Price,
                ScoreToAdd: item.ScoreToAdd,
                Url: item.Url,
                Weight: item.Weight,
                Year: item.Year,
                BestsellerQty: item.BestsellerQty,
                DescEndDate: item.DescEndDate,
                ExemplarsCountToAddScores: item.ExemplarsCountToAddScores,
                FreeQty: item.FreeQty,
                HasScoresDiscount: item.HasScoresDiscount,
                IsRecommended: item.IsRecommended,
                ItemDiscount: item.ItemDiscount,
                NewBeginDate: item.NewBeginDate,
                ScoresDiscountAmountNeeded: item.ScoresDiscountAmountNeeded,
                ScoresDiscountPrice: item.ScoresDiscountPrice,
            },
        });
    }, function (err) {
        console.log(err);
    });
});

router.post("/ItemsByIdListGet/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/ItemPriceGet/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/GetAlsoBuyItems/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/GetAlsoViewedBought/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/GetAlsoViewedItems/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/GetItemsExemplarQtyByIdList/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/GetProductOfTheDay/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/ItemGetAccessoryList/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/ItemGetBundleList/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/ItemGetByISBN/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/ItemGetParityList/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

router.post("/SuiteItemsGet/", function (req, res) {
    res.json({Status: 2, Error: null,});
});

module.exports = router;