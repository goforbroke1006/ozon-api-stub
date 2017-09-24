"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../bin/www'),
    should = chai.should();

const
    describe = require("mocha").describe,
    it = require("mocha").it;

chai.use(chaiHttp);

describe('PartnerService', () => {
    describe('ClientService', () => {
        describe('ClientCheckEmail', () => {
            it('should do email check', (done) => {
                let clientData = {
                    login: "test",
                    password: "test",
                    email: "test@test.test",
                };
                chai.request(server)
                    .post('/PartnerService/ClientService/ClientCheckEmail/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.to.have.own.property('Status');
                        res.body.should.to.have.own.property('Error');
                        res.body.should.to.have.not.own.property('Wildfowl');
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
                    .post('/PartnerService/ClientService/PartnerClientRegistration/')
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

    describe('CheckoutService', () => {
        describe('CheckoutStart', () => {
            it('should to start order building and return GUID', (done) => {
                let clientData = {
                    login: "",
                    password: "",
                    partnerClientId: "user001",
                    isPredRelease: false,
                };
                chai.request(server)
                    .get('/PartnerService/CheckoutService/CheckoutStart/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.Status.should.to.equal(2);
                        done();
                    });
            })
        });
        describe('CheckoutFavouritesGet', () => {
            it('should to return list of favorite delivery points', (done) => {
                let clientData = {
                    login: "",
                    password: "",
                    partnerClientId: "user001",
                    isPredRelease: false,
                    guidValue: "irjgfiuehgiur",
                };
                chai.request(server)
                    .get('/PartnerService/CheckoutService/CheckoutFavouritesGet/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.Status.should.to.equal(2);
                        res.body.FavouriteItems.should.be.a('array');
                        done();
                    });
            })
        });
        describe('DeliveryAddressesGet', () => {
            it('should to return list of regions', (done) => {
                let clientData = {
                    login: "",
                    password: "",
                    partnerClientId: "user001",
                    isPredRelease: false,
                    guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
                };
                chai.request(server)
                    .get('/PartnerService/CheckoutService/DeliveryAddressesGet/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);

                        res.body.should.be.a('object');
                        res.body.should.to.have.own.property('Status');
                        res.body.should.to.have.own.property('AreaGroupCollection');

                        res.body.Status.should.to.equal(2);

                        done();
                    });
            })
        });
        describe('DeliveryVariantsGet', () => {
            it('should to return delivery variants', (done) => {
                let clientData = {
                    login: "",
                    password: "",
                    partnerClientId: "user001",
                    guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
                    addressId: 0,
                    areaId: 0,
                };
                chai.request(server)
                    .get('/PartnerService/CheckoutService/DeliveryVariantsGet/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);

                        res.body.should.be.a('object');
                        res.body.should.to.have.own.property('Status');
                        res.body.DeliveryChoices.should.be.a('array');

                        res.body.Status.should.to.equal(2);

                        done();
                    });
            })
        });
        describe('PaymentsVariantsGet', () => {
            it('should to return payment variants', (done) => {
                let clientData = {
                    login: "",
                    password: "",
                    partnerClientId: "user001",
                    guidValue: "asdwad-s-ds-ds-dsd-sds-d-s-d-sdsdsf",
                    addressId: 0,
                    areaId: 0,
                    deliveryVariantId: 0,
                };
                chai.request(server)
                    .get('/PartnerService/CheckoutService/PaymentsVariantsGet/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);

                        res.body.should.be.a('object');
                        res.body.should.to.have.own.property('Status');
                        res.body.PaymentGroups.should.be.a('array');

                        res.body.Status.should.to.equal(2);

                        done();
                    });
            })
        });
    });
});