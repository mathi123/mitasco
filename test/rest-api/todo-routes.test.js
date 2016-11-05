var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var testHelpers = require('../test-helpers').TestHelpers;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Todo', function () {
    var token;

    before(function (done) {
        testHelpers.getToken()
            .then(function (t) {
                token = t;
                done();
            });
    });

    it('GET /api/todo', function (done) {
        chai.request(localhost)
            .get('/api/todo')
            .set('token', token)
            .query({query: '', skip:0, take:10})
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('PUT /api/todo', function (done) {
        var data = {id: 0, description: "test new todo", isDone: false};
        chai.request(localhost)
            .put('/api/todo')
            .send(data)
            .set('content-type', json)
            .set('token', token)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('number');
                expect(res.body).not.to.equal(0);
                done();
            });
    });
});