"use strict";

let express = require('express'),
    router = express.Router();

router.all('/*', function (req, res, next) {
    let guid = null;
    if (undefined !== req.query.guidValue)
        guid = req.query.guidValue;
    if (undefined !== req.body.guidValue)
        guid = req.body.guidValue;

    if (true !== req.url.endsWith('/CheckoutStart/')
        && (undefined === guid || 0 === guid.length)
    ) {
        next(new Error('You should specify valid guidValue'));
    }
    next();
});

router.get('/CheckoutStart/', function (req, res, next) {
    res.json({Status: 2, OrderGuid: "AAAAAA-666-ZZZ-0000"}); // TODO: realize me!!
});

router.get('/CheckoutFavouritesGet/', function (req, res, next) {
    res.json({
        Status: 2,
        FavouriteItems: [
            {
                AddressId: null,
                AreaId: null,
                DeliveryVariantId: null,
                ItemSumm: null,
                DeliverySumm: null,
                FullAddress: null,
                Addressee: null,
                SPPName: null,
                DeliveryVariantGroup: null,
                DeliveryVariant: null,
                PaymentType: null,
                PaymentTypeId: null,
                DeliveryPointAddressId: null,
                IsFavourite: null,
            },
            {
                AddressId: null,
                AreaId: null,
                DeliveryVariantId: null,
                ItemSumm: null,
                DeliverySumm: null,
                FullAddress: null,
                Addressee: null,
                SPPName: null,
                DeliveryVariantGroup: null,
                DeliveryVariant: null,
                PaymentType: null,
                PaymentTypeId: null,
                DeliveryPointAddressId: null,
                IsFavourite: null,
            },
        ],
    }); // TODO: realize me!!
});

router.get('/DeliveryAddressesGet/', function (req, res, next) {
    res.json({
        Status: 2,
        AreaGroupCollection: "Moscow"
    }); // TODO: realize me!!
});

router.get('/DeliveryVariantsGet/', function (req, res, next) {
    res.json({
        Status: 2,
        ICount: 0,
        HaveRestrict: false,
        DeliveryChoices: [],
    }); // TODO: realize me!!
});

router.get('/PaymentsVariantsGet/', function (req, res, next) {
    res.json({
        Status: 2,
        PaymentGroups: [
            {
                GroupID: 0,
                GroupName: "",
                PaymentTypes: "",
                PaymentSingleType: {
                    PaymentTypeID: 0,
                    Name: "",
                    ClientAccountSumm: 0,
                    FullOrderSumm: 0,
                    Discount: 0,
                    NoClientAccountPayment: "",
                    DeliverySumm: 0,
                    ItemSumm: 0,
                    AdditionalInfo: "",
                    RequiredMobilePhone: false,
                }
            }
        ]
    }); // TODO: realize me!!
});

module.exports = router;