"use strict";

process.env.NODE_ENV = "test";

let chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("./../../../../bin/www"),
    should = chai.should();

const
    describe = require("mocha").describe,
    it = require("mocha").it;

const parseCartItems = require("./../../../../api/routes/partner-service/cart-service").parseCartItems;

chai.use(chaiHttp);

describe("PartnerService -> CartService", () => {
    describe("CartAdd", () => {
        it("parseCartItems works fine", () => {
            let actual = parseCartItems("1:1,10:4,3:5").sort(),
                expected = [
                    {item: 1, count: 1},
                    {item: 10, count: 4},
                    {item: 3, count: 5}
                ].sort();
            actual.should.to.deep.equal(expected);
        });

        it("should to start order building and return GUID", (done) => {
            let clientData = {
                login: "",
                password: "",
                partnerClientId: "user001",
                cartItems: "1:1,2:1",
                partnerAgentId: null,
                delayCartUpdate: false,
            };
            chai.request(server)
                .post("/PartnerService/CartService/CartAdd/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body["Status"].should.to.equal(2);
                    res.body["Url"].should.not.be.empty;
                    done();
                });
        })
    });
});