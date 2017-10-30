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

let ItemGroupModel = null;
let ClientModel = null;

describe("PartnerService -> ItemGroupService", () => {
    let fakePartnerClientId = "client-001";

    before(() => {
        let db = app.get("db");
        ClientModel = db.model("client");
        ItemGroupModel = db.model("item-group");

        ClientModel.find({}).remove().exec();
        ItemGroupModel.find({}).remove().exec();

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
                    ItemGroupModel.create(items, function (err) {
                        if (err && err.code !== 11000) reject(err);
                        else resolve();
                    });
                });
            });
    });

    after(() => {
        ClientModel.find({}).remove().exec();
        ItemGroupModel.find({}).remove().exec();
    });

    describe("ItemsRecursiveGet", () => {
        it("should get all products recursively down", (done) => {
            let fakePartnerClientId = "pci-08";

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
                        chai.request(server)
                            .post("/PartnerService/ItemGroupService/ItemsRecursiveGet/")
                            .send({
                                login: 'test',
                                password: 'test',
                                partnerClientId: fakePartnerClientId,
                                startItemGroupId: 3,
                                startGroupName: "Fake Products"
                            })
                            .end((err, res) => {
                                res.body.should.be.a("object");
                                res.body.Status.should.be.equal(2, res.body.Error);

                                res.body.should.to.have.own.property("TotalItems");
                                res.body["TotalItems"].should.be.a("string");

                                res.body.should.to.have.own.property("GoodsItems");
                                res.body["GoodsItems"].should.be.a("array");
                                res.body["GoodsItems"]["Name"].should.be.a("string");
                                res.body["GoodsItems"]["Detail"].should.be.a("string");
                                res.body["GoodsItems"]["Price"].should.be.a("number");

                                resolve();
                                done();
                            });
                    });
                });
        });
    });
});