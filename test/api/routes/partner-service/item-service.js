"use strict";

process.env.NODE_ENV = "test";

let mocha = require("mocha"),
    chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www").server,
    app = require("./../../../../bin/www").app,
    utils = require("./../../../../utils"),
    Faker = require("Faker"),
    should = chai.should(),
    Promise = require("bluebird"),
    describe = mocha.describe,
    it = mocha.it,
    before = mocha.before,
    after = mocha.after;

chai.use(chaiHttp);

let ItemModel = null;
let ClientModel = null;

describe("PartnerService -> ItemService", () => {
    let fakePartnerClientId = "client-001";

    before(() => {
        let db = app.get("db");
        ClientModel = db.model("client");
        ItemModel = db.model("item");

        ClientModel.find({}).remove().exec();
        ItemModel.find({}).remove().exec();

        Promise.resolve()
            .then(() => {
                return new Promise((resolve, reject) => {
                    let client = new ClientModel({
                        partnerClientId: fakePartnerClientId,
                        email: "some-wildfowl@tra.ta.ta",
                        clientPassword: "123456",

                        lastName: "Some last name",
                        firstName: "Some first name",
                        middleName: "",

                        SpamSubscribe: 1,
                    });
                    client.save(function (err, client) {
                        if (err) reject(); else resolve();
                    });
                });
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    let items = [
                        {
                            Annotation: Faker.Lorem.paragraph(20),
                            Author: Faker.Lorem.words(2),
                            Name: Faker.Lorem.words(1),
                            Id: 1,
                            FreeQty: utils.randomInt(100, 500)
                        },
                        {
                            Annotation: Faker.Lorem.paragraph(20),
                            Author: Faker.Lorem.words(2),
                            Name: Faker.Lorem.words(1),
                            Id: 2,
                            FreeQty: utils.randomInt(100, 500)
                        },
                    ];
                    ItemModel.create(items, function (err) {
                        if (err && err.code !== 11000) reject(err);
                        else resolve();
                    });
                });
            });
    });

    after(() => {
        ClientModel.find({}).remove().exec();
        ItemModel.find({}).remove().exec();
    });

    describe("ItemGet", () => {
        it("should find item bi ID", (done) => {
            chai.request(server)
                .get("/PartnerService/ItemService/ItemGet/")
                .query({login: "test", password: "test", partnerClientId: fakePartnerClientId, ItemId: 1})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.to.have.own.property("Status");
                    res.body.should.to.have.not.own.property("Error");
                    res.body.Item.should.be.a("object");

                    res.body.Status.should.be.equal(2);
                    res.body.Item["Id"].should.be.equal(1);

                    done(); // send asserting ready signal
                    resolve(); // resolve promise for move to next "then" block
                });
        });
    });
});