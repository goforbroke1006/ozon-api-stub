"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let DiscountCode = new Schema({
    CodeName: {
        type: String,
        unique: true
    },
    Discount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('discountcode', DiscountCode);