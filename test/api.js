"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../bin/www'),
    should = chai.should();

const describe = require("mocha").describe,
    it = require("mocha").it;

chai.use(chaiHttp);

describe('PartnerService', () => {
    describe('ClientService', () => {

        describe('ClientCheckEmail', () => {
            it('should do email check', (done) => {
                let clientData = {
                    "login": "test",
                    "password": "test",
                    "email": "test@test.test",
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
                    "login": "",
                    "password": "",
                    "partnerClientId": "",
                    "email": "",
                    "clientPassword": "",
                    "firstName": "",
                    "lastName": "",
                    "middleName": "",
                    "spamSubscribe": "",
                    "userIp": "",
                    "userAgent": "",
                };
                chai.request(server)
                    .post('/PartnerService/ClientService/PartnerClientRegistration/')
                    .send(clientData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })
        });

    });
});