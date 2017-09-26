"use strict";

process.env.NODE_ENV = "test";

let chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www"),
    should = chai.should();

const
    describe = require("mocha").describe,
    it = require("mocha").it;

const
    Promise = require('bluebird'),
    mongoose = require('mongoose'),
    ClientSchema = require("./../../../../api/models/client");

chai.use(chaiHttp);

describe("PartnerService -> ClientService", () => {
    describe("ClientCheckEmail", () => {
        it('should find client with existing email', (done) => {

            Promise.resolve()
                .then(() => {
                    let client = new ClientSchema({
                        partnerClientId: 'Chuck-Norris',
                        email: "ChuckNorris@ChuckNorris.ChuckNorris",
                        clientPassword: "run",

                        lastName: "Norris",
                        firstName: "Chuck",
                        middleName: "",

                        SpamSubscribe: 1,
                    });
                    client.save();
                })
                .then(() => {
                    let clientData = {
                        login: "test",
                        password: "test",
                        email: "ChuckNorris@ChuckNorris.ChuckNorris",
                    };
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
                        });
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