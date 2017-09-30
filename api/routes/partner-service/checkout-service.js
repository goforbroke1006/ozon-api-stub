"use strict";

let router = require("express").Router();

router.get("/CheckoutStart/", (req, res, next) => {
    res.json({
        Status: 2,
        OrderGuid: "AAAAAA-666-ZZZ-0000"
    }); // TODO: realize me!!
});

router.get("/CheckoutFavouritesGet/", (req, res, next) => {
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

router.get("/DeliveryAddressesGet/", (req, res, next) => {
    res.json({
        Status: 2,
        AreaGroupCollection: "Moscow"
    }); // TODO: realize me!!
});

router.get("/DeliveryVariantsGet/", (req, res, next) => {
    res.json({
        Status: 2,
        DeliveryModel: {
            DeliveryGroups: [
                {
                    Delivery: [
                        {
                            CityName: "СИМФЕРОПОЛЬ",
                            DeliveryMarketingActionTypeId: 0,
                            DeliveryPointAddressId: 1013018,
                            DeliveryPoints: [],
                            DeliverySumm: 576,
                            DeliverySummDiscount: -576,
                            DeliveryVariantGroupId: 1,
                            DeliveryVariantGroupName: "",
                            DeliveryVariantId: 1013018,
                            Description: "",
                            ExpectedDeliveryDate: "/Date(1506941524671+0300)/",
                            FullDeliveryCost: 576,
                            FullOrderSumm: 1595,
                            HasDeliveryStatusDiscount: "",
                            InfoDetailId: 0,
                            ItemSumm: 1019,
                            MinOrderPrice: 0,
                            Name: "DHL",
                            TariffTipsMessage: "",
                        },
                        {
                            CityName: "СИМФЕРОПОЛЬ",
                            DeliveryMarketingActionTypeId: 0,
                            DeliveryPointAddressId: 0,
                            DeliveryPoints: [],
                            DeliverySumm: 828,
                            DeliverySummDiscount: 0,
                            DeliveryVariantGroupId: 1,
                            DeliveryVariantGroupName: "Курьерская",
                            DeliveryVariantId: 322,
                            Description: "Срок доставки - от 4 до 5 рабочих дней после передачи заказа в курьерскую службу. Внимание! При получении и оплате заказа, доставленного наложенным платежом, взимается плата по тарифу на пересылку внутренних простых почтовых переводов. Процент оплаты зависит от пересылаемой суммы и не зависит от технологии пересылки денежных средств, более подробно ознакомиться с тарифами Вы можете на сайте Федеральной Почтовой службы: http://www.russianpost.ru/portal/ru/home/financial/cybermoney_russia",
                            ExpectedDeliveryDate: "/Date(1506941524671+0300)/",
                            FullDeliveryCost: 828,
                            FullOrderSumm: 1847,
                            HasDeliveryStatusDiscount: "",
                            InfoDetailId: 4120131,
                            ItemSumm: 1019,
                            MinOrderPrice: 0,
                            Name: "EMS Почта России",
                            TariffTipsMessage: "",
                        },
                    ],
                    DeliveryGroupID: 1,
                    DeliveryGroupName: "Курьерская",
                },
                {
                    Delivery: [
                        {
                            CityName: "СИМФЕРОПОЛЬ",
                            DeliveryMarketingActionTypeId: 0,
                            DeliveryPointAddressId: 0,
                            DeliveryPoints: null,
                            DeliverySumm: 363,
                            DeliverySummDiscount: 0,
                            DeliveryVariantGroupId: 2,
                            DeliveryVariantGroupName: "Почта",
                            DeliveryVariantId: 392,
                            Description: "Срок доставки - от 2 до 6 недель после передачи заказа в службу доставки в зависимости от удаленности региона. <a href=\"javascript://\" onClick=\"showInfo(1687438);\"><img src=\"/graphics/ozon/order/question.gif\" alt=\"подробнее\" width=\"14\" height=\"14\" border=\"0\"/></a> Внимание! При получении и оплате заказа, доставленного наложенным платежом, взимается плата по тарифу на пересылку внутренних простых почтовых переводов. Процент оплаты зависит от пересылаемой суммы и не зависит от технологии пересылки денежных средств, более подробно ознакомиться с тарифами Вы можете на сайте Федеральной Почтовой службы: http://www.russianpost.ru/portal/ru/home/financial/cybermoney_russia",
                            ExpectedDeliveryDate: "/Date(1506855124671+0300)/",
                            FullDeliveryCost: 363,
                            FullOrderSumm: 1382,
                            HasDeliveryStatusDiscount: null,
                            InfoDetailId: 20007170,
                            ItemSumm: 1019,
                            MinOrderPrice: 0,
                            Name: "Почта России (предоплата)",
                            TariffTipsMessage: null,
                        },
                        {
                            CityName: "СИМФЕРОПОЛЬ",
                            DeliveryMarketingActionTypeId: 0,
                            DeliveryPointAddressId: 0,
                            DeliveryPoints: null,
                            DeliverySumm: 750,
                            DeliverySummDiscount: 0,
                            DeliveryVariantGroupId: 2,
                            DeliveryVariantGroupName: "Почта",
                            DeliveryVariantId: 55,
                            Description: "Срок доставки - от 2 до 6 недель после передачи заказа в службу доставки в зависимости от удаленности региона. <a href=\"javascript://\" onClick=\"showInfo(1687438);\"><img src=\"/graphics/ozon/order/question.gif\" alt=\"подробнее\" width=\"14\" height=\"14\" border=\"0\"/></a> Внимание! При получении и оплате заказа, доставленного наложенным платежом, взимается плата по тарифу на пересылку внутренних простых почтовых переводов. Процент оплаты зависит от пересылаемой суммы и не зависит от технологии пересылки денежных средств, более подробно ознакомиться с тарифами Вы можете на сайте Федеральной Почтовой службы: http://www.russianpost.ru/portal/ru/home/financial/cybermoney_russia",
                            ExpectedDeliveryDate: /Date(1506855124671+0300)/,
                            FullDeliveryCost: 750,
                            FullOrderSumm: 1769,
                            HasDeliveryStatusDiscount: null,
                            InfoDetailId: 4119777,
                            ItemSumm: 1019,
                            MinOrderPrice: 0,
                            Name: "Почта России (оплата при получении)",
                            TariffTipsMessage: null,
                        }
                    ],
                    DeliveryGroupID: 2,
                    DeliveryGroupName: "Почта",
                }
            ],
            HaveRestrict: 0,
            ICount: 1,
        }

    }); // TODO: realize me!!
});

router.get("/PaymentsVariantsGet/", (req, res, next) => {
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

router.get("/AreasByZipCode/", (req, res, next) => {
    if (undefined === req.query.zipCode || 0 === req.query.zipCode.length) {
        let error = new Error("You should to define zipCode!");
        error.status = 400;
        next(error)
    }

    res.json({
        Status: 2,
        AreaInfoCollection: [
            {
                Area: "СИМФЕРОПОЛЬ",
                AreaId: 44079,
                Country: "Россия",
                District: null,
                IsNewIndex: 1,
                PostOffice: "СИМФЕРОПОЛЬ",
                Region: "РЕСПУБЛИКА КРЫМ",
                ZipCode: req.query.zipCode,
            }
        ]
    }); // TODO: realize me!!
});

module.exports = router;