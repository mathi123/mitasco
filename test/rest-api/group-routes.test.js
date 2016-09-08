var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../web-server');
var expect = require('chai').expect;

var localhost = 'https://localhost:3000';
var json = 'application/json';

chai.use(chaiHttp);

describe('Group', function () {
    var data = {id: 0, description: "test new group", users: [], permissionCodes:[]};
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJpYXQiOjE0NzMwODY3MDZ9.bYbOezSuiT3wonwFK_VwsUrMwbl8JtZweNK4yf9z4bY";

    it('GET /api/group', function (done) {
        chai.request(localhost)
            .get('/api/group')
            .set('token', token)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('PUT /api/group', function (done) {
        chai.request(localhost)
            .put('/api/group')
            .set('content-type', json)
            .set('token', token)
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

    var userId;
    var permissionCodeId;
    it('POST /api/group', function (done) {
        chai.request(localhost)
            .put('/api/user')
            .set('content-type', json)
            .set('token', token)
            .send({id:0, fullname:"testUser",email:Math.random()+"test@usergroup.be"})
            .end(function(err, res){
                if(err){
                    done(err);
                }
                userId = res.body;

                chai.request(localhost)
                    .put('/api/permissioncode')
                    .set('content-type', json)
                    .set('token', token)
                    .send({id:0, description:"testUser",code:Math.random()+"test4groups"})
                    .end(function(err, res) {
                        if (err) {
                            done(err);
                        }
                        permissionCodeId = res.body;

                        data.description = data.description + 'changed';
                        data.users = [{key: userId, value: "test user"}];
                        data.permissionCodes = [{id:permissionCodeId,code:"",description:""}];

                        chai.request(localhost)
                            .post('/api/group')
                            .set('content-type', json)
                            .set('token', token)
                            .send(data)
                            .end(function (err, res) {
                                if (err) {
                                    done(err);
                                }
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
            });
    });

    it('GET /api/group', function (done) {
        chai.request(localhost)
            .get('/api/group/'+data.id)
            .set('token', token)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body.description).to.equal(data.description);
                expect(res.body.users[0].key).to.equal(userId);
                expect(res.body.permissionCodes[0].id).to.equal(permissionCodeId);
                done();
            });
    });

    it('DELETE /api/group', function (done) {
        chai.request(localhost)
            .delete('/api/group/'+data.id)
            .set('token', token)
            .end(function(err, res){
                if(err){
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
});