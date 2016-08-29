var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../web-server');
var expect = require('chai').expect;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Todo', function () {
    it('GET /api/todo', function (done) {
        chai.request(localhost)
            .get('/api/todo')
            .query({query: '', skip:0, take:10})
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('POST /api/todo', function (done) {
        var data = {id: 0, description: "test new todo", isDone: false};
        chai.request(localhost)
            .post('/api/todo')
            .send(data)
            .set('content-type', json)
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