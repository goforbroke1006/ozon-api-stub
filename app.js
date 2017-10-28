"use strict";
require('babel-polyfill');

const
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    config = require('config'),
    mongoose = require('mongoose');

require("./api/models/client");

const
    index = require('./routes/index'),
    users = require('./routes/users');

const
    psItemGroupServiceAPI = require('./api/routes/partner-service/item-group-service'),
    psClientServiceAPI = require('./api/routes/partner-service/client-service'),
    psCartServiceAPI = require('./api/routes/partner-service/cart-service'),
    psCheckoutServiceValidationAPI = require('./api/routes/partner-service/checkout-service-validation'),
    psCheckoutServiceAPI = require('./api/routes/partner-service/checkout-service');

const app = express();
mongoose.Promise = require('bluebird');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('config', config);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Web-page links
app.use('/', index);
app.use('/users', users);

// API routes
app.use("/PartnerService", require("./api/routes/common-validation"));

app.use("/PartnerService/ItemGroupService", psItemGroupServiceAPI.router);
app.use("/PartnerService/ClientService", psClientServiceAPI);
app.use("/PartnerService/CartService", psCartServiceAPI.router);
app.use("/PartnerService/CheckoutService", psCheckoutServiceValidationAPI);
app.use("/PartnerService/CheckoutService", psCheckoutServiceAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
