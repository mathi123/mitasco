var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var testHelpers = require('../test-helpers').TestHelpers;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Country', function () {
    var token;
    var userId;

    before(function (done) {
        testHelpers.getTestCredentials()
            .then(function (t) {
                token = t.token;
                userId = t.userId;
                done();
            });
    });

    it('GET /api/country', function (done) {
        chai.request(localhost)
            .get('/api/country')
            .set('token', token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('GET /api/country?priority=1', function (done) {
        chai.request(localhost)
            .get('/api/country')
            .set('token', token)
            .query({priority: '1'})
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
});