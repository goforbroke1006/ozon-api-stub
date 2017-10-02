"use static";

let Regex = require('regex');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let regex = new Regex(/(\d+)$/ig);

let PromoSchema = new Schema({
    PromoName: {
        type: String,
        unique: true
    },
    Discount: {
        type: Number,
        default: regex.exec(PromoName)
    }
});

module.exports = mongoose.model('promo', PromoSchema);