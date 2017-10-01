"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ItemSchema = new Schema({
    Annotation: String,
    Author: String,
    AvailableCount: {type: Number, default: 0},
    AvailabilityDate: {type: Date, default: (new Date()).getDate() + 365},
    BargainSale: Boolean,
    // ClientRating: null,
    // ClientRatingCount: null,
    Detail: String,
    DigitalTypeId: Number,
    Discount: {type: Number, default: 0},
    DiscountPrice: {type: Number, default: 0},
    Id: {type: Number, unique: true},
    InSuite: Number,
    IsNew: {type: Boolean, default: false},
    IsSpecialPrice: {type: Boolean, default: false},
    ItemAvailabilityId: Number,
    ItemType: String,
    ItemTypeId: Number,
    LookInSide: {type: Boolean, default: false},
    Media: String,
    Name: String,
    // Ordered: Boolean,
    OtherName: String,
    Path: String,
    Price: {type: Number, default: 0},
    ScoreToAdd: {type: Number, default: 0},
    Url: {type: String, unique: true},
    Weight: {type: Number, default: 0},
    Year: {type: Number, default: (new Date()).getYear()},
    BestsellerQty: {type: Number, default: 0},
    DescEndDate: {type: Date, default: Date.now},
    ExemplarsCountToAddScores: {type: Number, default: 0},
    FreeQty: {type: Number, default: 1000},
    HasScoresDiscount: Boolean,
    IsRecommended: {type: Boolean, default: false},
    ItemDiscount: {type: Number, default: 0},
    NewBeginDate: {type: Date, default: Date.now},
    ScoresDiscountAmountNeeded: {type: Number, default: 0},
    ScoresDiscountPrice: {type: Number, default: 0},
});

module.exports = mongoose.model("item", ItemSchema);