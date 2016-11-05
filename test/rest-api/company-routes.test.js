var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var testHelpers = require('../test-helpers').TestHelpers;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Company', function () {
    var token;
    var id = 0;

    before(function (done) {
        testHelpers.getToken()
            .then(function (t) {
                token = t;
                done();
            });
    });

    it('GET /api/company', function (done) {
        chai.request(localhost)
            .get('/api/company')
            .set('token', token)
            .query({query: '', skip: 0, take: 10})
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('POST /api/company', function (done) {
        var data =
        {
            id: 0,
            name: "test new Company",
            email: "test email",
            phone: "",
            fax: "",
            cell: "",
            url: "",
            street: "",
            zip: "",
            city: ""
        };
        chai.request(localhost)
            .post('/api/company')
            .send(data)
            .set('content-type', json)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('number');
                expect(res.body).not.to.equal(0);
                id = res.body;
                done();
            });
    });

    it('PUT /api/company', function (done) {
        var data =
        {
            id: id,
            name: "email changed",
            email: "email changed",
            phone: "",
            fax: "",
            cell: "",
            url: "",
            street: "",
            zip: "",
            city: ""
        };
        chai.request(localhost)
            .put('/api/company')
            .send(data)
            .set('content-type', json)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('GET /api/company/:id', function (done) {
        chai.request(localhost)
            .get('/api/company/' + id)
            .set('content-type', json)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body.email).to.equal("email changed");
                done();
            });
    });

    it('DELETE /api/company/:id', function (done) {
        chai.request(localhost)
            .delete('/api/company/' + id)
            .set('content-type', json)
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
});