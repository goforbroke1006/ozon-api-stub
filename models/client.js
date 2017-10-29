"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    partnerClientId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    clientPassword: String,

    lastName: String,
    firstName: String,
    middleName: String,

    SpamSubscribe: Boolean,
});

module.exports = mongoose.model("client", ClientSchema);