"use strict";

process.env.NODE_ENV = "test";

let chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www").server,
    app = require("./../../../../bin/www").app,
    should = chai.should(),
    mocha = require("mocha"),
    describe = mocha.describe,
    it = mocha.it,
    before = mocha.before,
    after = mocha.after,
    beforeEach = mocha.beforeEach,
    afterEach = mocha.afterEach;

chai.use(chaiHttp);

let ClientModel = null;

describe("PartnerService -> CheckoutService", () => {
    let fakePartnerClientId = "client-001";

    before(() => {
        ClientModel = app.get("db").model("client");
        ClientModel.find({}).remove().exec();

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
                if (err && err.code === 11000) reject(err);
                else resolve();
            });
        });
    });

    after(() => {
        ClientModel.find({}).remove().exec();
    });

    describe("CheckoutStart", () => {
        it("should to start order building and return GUID", (done) => {
            let clientData = {
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                isPredRelease: false,
            };
            chai.request(server)
                .get("/PartnerService/CheckoutService/CheckoutStart/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.Status.should.to.equal(2);
                    done();
                });
        })
    });
    describe("CheckoutFavouritesGet", () => {
        it("should to return list of favorite delivery points", (done) => {
            let clientData = {
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                isPredRelease: false,
                guidValue: "irjgfiuehgiur",
            };
            chai.request(server)
                .get("/PartnerService/CheckoutService/CheckoutFavouritesGet/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.Status.should.to.equal(2);
                    res.body.FavouriteItems.should.be.a("array");
                    done();
                });
        })
    });
    describe("DeliveryAddressesGet", () => {
        it("should to return list of regions", (done) => {
            let clientData = {
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                isPredRelease: false,
                guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
            };
            chai.request(server)
                .get("/PartnerService/CheckoutService/DeliveryAddressesGet/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a("object");
                    res.body.should.to.have.own.property("Status");
                    res.body.should.to.have.own.property("AreaGroupCollection");

                    res.body.Status.should.to.equal(2);

                    done();
                });
        })
    });
    describe("DeliveryVariantsGet", () => {
        it("should to return delivery variants", (done) => {
            let clientData = {
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
                addressId: 0,
                areaId: 0,
            };
            chai.request(server)
                .get("/PartnerService/CheckoutService/DeliveryVariantsGet/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a("object");
                    res.body.should.to.have.own.property("Status");
                    res.body.DeliveryModel.should.be.a("object");
                    res.body.DeliveryModel.DeliveryGroups.should.be.a("array");

                    res.body.Status.should.to.equal(2);

                    done();
                });
        })
    });
    describe("PaymentsVariantsGet", () => {
        it("should to return payment variants", (done) => {
            let clientData = {
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
                addressId: 0,
                areaId: 0,
                deliveryVariantId: 0,
            };
            chai.request(server)
                .get("/PartnerService/CheckoutService/PaymentsVariantsGet/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a("object");
                    res.body.should.to.have.own.property("Status");
                    res.body.PaymentGroups.should.be.a("array");

                    res.body.Status.should.to.equal(2);

                    done();
                });
        })
    });
});