"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let DiscountCode = new Schema({
    PromoName: {
        type: String,
        unique: true
    },
    Discount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('promo', DiscountCode);