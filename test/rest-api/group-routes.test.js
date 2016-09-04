var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../web-server');
var expect = require('chai').expect;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Group', function () {
    var randomstuff = "description " + Math.random();

    it('GET /api/group', function (done) {
        chai.request(localhost)
            .get('/api/group')
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    var data = {id: 0, description: "test new group", users: [], permissionCodes:[]};
    it('PUT /api/group', function (done) {
        chai.request(localhost)
            .put('/api/group')
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

    it('POST /api/group', function (done) {
        data.description = data.description + 'changed';
        chai.request(localhost)
            .post('/api/group')
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

    it('GET /api/group', function (done) {
        chai.request(localhost)
            .get('/api/group/'+data.id)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body.description).to.equal(data.description);
                done();
            });
    });

    it('DELETE /api/group', function (done) {
        chai.request(localhost)
            .delete('/api/group/'+data.id)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
});