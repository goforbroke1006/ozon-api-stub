"use strict";

process.env.NODE_ENV = "test";

let chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www").server,
    app = require("./../../../../bin/www").app,
    should = chai.should(),
    Promise = require('bluebird'),
    describe = require("mocha").describe,
    it = require("mocha").it;

chai.use(chaiHttp);

describe("PartnerService -> ClientService", () => {
    describe("ClientCheckEmail", () => {
        it('should find client with existing email', (done) => {

            let db = app.get("db"),
                Client = db.model("client");

            let emailForTest = "ChuckNorrisWillFindYouO_o@ChuckNorris.ChuckNorris";

            Promise.resolve()
                .then(() => {
                    // add fake client
                    let client = new Client({
                        partnerClientId: 'pci-001',
                        email: emailForTest,
                        clientPassword: "123456",

                        lastName: "Some last name",
                        firstName: "Some first name",
                        middleName: "",

                        SpamSubscribe: 1,
                    });
                    client.save();
                })
                .then(() => {
                    // try to check is free fake email
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
                                res.body.should.be.a('object');
                                res.body.should.to.have.own.property("Status");
                                res.body.should.to.have.own.property("Error");
                                res.body.should.to.have.not.own.property("Wildfowl");
                                res.body.Status.should.be.equal(1);
                                res.body.Error.should.be.equal("Email already exists!");
                                done();
                                resolve();
                            });
                    });
                })
                .then(() => {
                    // remove fake client
                    Client.find({email: emailForTest}).remove().exec();
                })
                .catch((err) => console.error(err.stack));
        });
        it('should not find by some not existing email', (done) => {
            let clientData = {
                login: "test",
                password: "test",
                email: "wildfowl-666@oa.stub",
            };
            chai.request(server)
                .post("/PartnerService/ClientService/ClientCheckEmail/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.to.have.own.property("Status");
                    res.body.should.to.have.own.property("Error");
                    res.body.Status.should.be.equal(2);
                    // TODO: check Error === null
                    done();
                });
        });
    });
    describe('PartnerClientRegistration', () => {
        it('should do registration with data', (done) => {
            let clientData = {
                login: "",
                password: "",
                partnerClientId: "qweetwrte",
                email: "",
                clientPassword: "",
                firstName: "",
                lastName: "",
                middleName: "",
                spamSubscribe: "",
                userIp: "",
                userAgent: "",
            };
            chai.request(server)
                .post("/PartnerService/ClientService/PartnerClientRegistration/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.to.have.own.property('Status');
                    res.body.should.to.have.own.property('Error');
                    done();
                });
        })
    });
});