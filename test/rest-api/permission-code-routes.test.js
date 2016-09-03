var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../web-server');
var expect = require('chai').expect;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Todo', function () {
    var randomPermissionCode = "code" + Math.random();

    it('GET /api/permissioncode', function (done) {
        chai.request(localhost)
            .get('/api/permissioncode')
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    var data = {id: 0, description: "test new todo", code: randomPermissionCode};
    it('PUT /api/permissioncode', function (done) {
        chai.request(localhost)
            .put('/api/permissioncode')
            .set('content-type', json)
            .send(data)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('number');
                expect(res.body).not.to.equal(0);
                data.id = res.body;
                done();
            });
    });

    it('POST /api/permissioncode', function (done) {
        data.code = data.code + 'changed';
        chai.request(localhost)
            .post('/api/permissioncode')
            .set('content-type', json)
            .send(data)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('GET /api/permissioncode', function (done) {
        chai.request(localhost)
            .get('/api/permissioncode/'+data.id)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body.code).to.equal(data.code);
                done();
            });
    });

    it('DELETE /api/permissioncode', function (done) {
        chai.request(localhost)
            .delete('/api/permissioncode/'+data.id)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
});