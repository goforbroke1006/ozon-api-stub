/*"use strict";
require('babel-polyfill');

const
    config = require('config'),
    mongoose = require("mongoose");
const Promise = require("bluebird");

module.exports.db = function () {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost/ozon-api-stub");
        let db = mongoose.connection;

        db.on('error', function (err) {
            console.log('connection error:' + err.message);
            reject(err);
        });
        db.once('open', function() {
            console.log("Connected to DB!");
            resolve(db);
        });
    });
};
module.exports.Schema = mongoose.Schema;

var promise = mongoose.createConnection('mongodb://localhost/myapp', {
    useMongoClient: true,
});
promise.then(function(db) {});*/


/*const Promise = require("bluebird");
const
  config = require('config'),
  db = require('sqlite/legacy');

module.exports.init = function init(app) {
  Promise.resolve()
      .then(() => {
          db.open(config.database.file, {Promise});
          console.log("Start to open connection");
      })
      .then(() => {
          app.set('db', db);
          console.log("Share connection");
      })
      .then(() => {
          db.migrate({force: 'last', cache: false});
          console.log("Apply migrations");
      })
      .catch((err) => console.error(err.stack));
  return db;
};*/

/*let onExitListener = () => {
    Promise.resolve()
        .then(() => db.close())
        .then(() => console.log("Stop db"))
        .catch((err) => console.error(err.stack));

    // server.close();
    // console.log("Stop server");

    setTimeout(function () {
        console.log("Delay exhausted!")
    }, 3000);

    return true;
};
process.on('SIGINT', onExitListener);*/
// process.on('exit', onExitListener);