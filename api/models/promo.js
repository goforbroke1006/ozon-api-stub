"use static";

let mongoose = required('mongoose');
let Schema = mongoose.Schema;

let PromoSchema = new Schema({
    PromoName: {
        type: String,
        unique: true
    },
    IsActivated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('promo', PromoSchema);