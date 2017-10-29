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
    after = mocha.after;

const parseCartItems = require("./../../../../api/routes/partner-service/cart-service").parseCartItems;

chai.use(chaiHttp);

let ClientModel = null;

describe("PartnerService -> CartService", () => {
    let fakePartnerClientId = "client-001";

    before(() => {
        ClientModel = app.get("db").model("client");
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
                login: "test",
                password: "test",
                partnerClientId: fakePartnerClientId,
                cartItems: "1:1,2:1",
                partnerAgentId: null,
                delayCartUpdate: false,
            };
            chai.request(server)
                .post("/PartnerService/CartService/CartAdd/")
                .send(clientData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body["Status"].should.to.equal(2);
                    res.body["Url"].should.not.be.empty;
                    done();
                });
        })
    });
});