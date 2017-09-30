"use strict";

process.env.NODE_ENV = "test";

let mocha = require("mocha"),
    chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www").server,
    app = require("./../../../../bin/www").app,
    should = chai.should(),
    Promise = require("bluebird"),
    describe = mocha.describe,
    it = mocha.it,
    before = mocha.before,
    beforeEach = mocha.beforeEach,
    afterEach = mocha.afterEach;

chai.use(chaiHttp);

let ClientModel = null;

describe("PartnerService -> ClientService", () => {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    before(() => {
        ClientModel = app.get("db").model("client");
    });

    beforeEach(() => {
        ClientModel.find({}).remove().exec();
    });

    afterEach(() => {
        ClientModel.find({}).remove().exec();
    });

    describe("ClientCheckEmail", () => {
        it('should find client with existing email', (done) => {
            let emailForTest = "ChuckNorrisWillFindYouO_o@ChuckNorris.ChuckNorris";

            Promise.resolve()
                .then(() => {
                    return new Promise((resolve, reject) => {
                        let client = new ClientModel({
                            partnerClientId: 'pci-001',
                            email: emailForTest,
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
                    let clientData = {
                        login: "test",
                        password: "test",
                        email: emailForTest,
                    };
                    return new Promise((resolve, reject) => {
                        chai.request(server)
                            .post("/PartnerService/ClientService/ClientCheckEmail/")
                            .send(clientData)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a("object");
                                res.body.should.to.have.own.property("Status");
                                res.body.should.to.have.own.property("Error");
                                res.body.should.to.have.not.own.property("Wildfowl");

                                res.body.Status.should.be.equal(1);
                                res.body.Error.should.be.equal("Email already exists!");

                                done(); // send asserting ready signal
                                resolve(); // resolve promise for move to next "then" block
                            });
                    });
                })
                .catch((err) => console.error(err.stack));
        });
    });

    describe("PartnerClientRegistration", () => {
        it("should do registration with data", (done) => {
            let emailForTest = "hello.world@hw.org";

            Promise.resolve()
                .then(() => {
                    return new Promise((resolve, reject) => {
                        let clientData = {
                            login: "test",
                            password: "test",
                            partnerClientId: "qweetwrte",
                            email: emailForTest,
                            clientPassword: "890123",
                            firstName: "Vladimir",
                            lastName: "Petrov",
                            middleName: "",
                            spamSubscribe: 0,
                            userIp: "123.123.123.123",
                            userAgent: "Some user agent",
                        };
                        chai.request(server)
                            .post("/PartnerService/ClientService/PartnerClientRegistration/")
                            .send(clientData)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a("object");
                                res.body.should.to.have.own.property("Status");
                                res.body.should.to.have.own.property("Error");

                                res.body.Status.should.be.equal(2, res.body.Error);

                                done();
                                resolve();
                            });
                    });
                })
                .catch((err) => console.error(err.stack));
        });
    });

    describe("ClientDiscountCodeApply", () => {
        it("should activate fake code", (done) => {
            let fakePartnerClientId = "pci-007";

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
                        let randPromoCodeDiscountValue = randomInt(100, 5000);
                        chai.request(server)
                            .post("/PartnerService/ClientService/ClientDiscountCodeApply/")
                            .send({
                                login: "test",
                                password: "test",
                                partnerClientId: fakePartnerClientId,
                                code: "WILDFOWL" + randPromoCodeDiscountValue
                            })
                            .end((err, res) => {
                                res.body.should.be.a("object");
                                res.body.should.to.have.own.property("ClientDiscountCodeApplyForWeb");
                                res.body["ClientDiscountCodeApplyForWeb"].should.be.a("object");
                                res.body["ClientDiscountCodeApplyForWeb"]["Discount"].should.be.a("number");
                                res.body["ClientDiscountCodeApplyForWeb"]["Result"].should.be.a("number");
                                res.body["ClientDiscountCodeApplyForWeb"]["DiscountValue"].should.be.a("number");
                                res.body["ClientDiscountCodeApplyForWeb"]["DiscountValue"].should.be.equal(randPromoCodeDiscountValue);

                                resolve();
                                done();
                            });
                    });
                });
        })
    });
});