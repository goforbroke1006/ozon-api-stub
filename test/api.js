"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai');
const describe = require("mocha").describe;
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe('PartnerService', () => {
    describe('ClientService', () => {
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