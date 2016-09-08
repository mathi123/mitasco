var UserController = require("../controllers/user.controller").UserController;
var AuthenticationController = require("../controllers/authentication.controller").AuthenticationController;
var should = require("should");
var jwt = require("jsonwebtoken");

describe("Authentication controller", function () {
    var userToAdd = {
        fullname: "Mathias Colpaert",
        email: Math.random() + "@gmail.com"
    };
    var password = "awesomepassword123";
    var userController = new UserController();
    var authController = new AuthenticationController();

    before(function(done) {
        userController.create(userToAdd, password)
            .then(function() {
                done();
            }).catch(function (err) {
                done(err);
        });
    });

    it("validates correct password as true", function(done){
        var credentials = {
            email: userToAdd.email,
            password: password
        };
        authController.credentialsAreValid(credentials).then(function(isValid){
            isValid.should.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it("validates incorrect password as false", function(done){
        var credentials = {
            email: userToAdd.email,
            password: "1234"
        };
        authController.credentialsAreValid(credentials).then(function(isValid){
            isValid.should.not.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it("validates null password as false", function(done){
        var credentials = {
            email: userToAdd.email,
            password: null
        };
        authController.credentialsAreValid(credentials).then(function(isValid){
            isValid.should.not.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it("validates undefined password as false", function(done){
        var credentials = {
            email: userToAdd.email
        };
        authController.credentialsAreValid(credentials).then(function(isValid){
            isValid.should.not.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it("validates non existing users as false", function(done){
        var credentials = {
            email: "sdfasdfasdf",
            password: "sdfadf"
        };
        authController.credentialsAreValid(credentials).then(function(isValid){
            isValid.should.not.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it("can get a userId by email", function (done) {
       authController.getUserIdByEmail(userToAdd.email)
           .then(function (id) {
               id.should.equal(userToAdd.id);
               done();
           }).catch(function (err) {
               done(err);
       });
    });
    var token;
    it("can create a token", function (done) {
        authController.createToken(userToAdd.id)
            .then(function (t) {
                token = t;
                console.log(token);
                done();
            }).catch(function (err) {
                done(err);
            });
    });
    it("verifies a correct token", function (done) {
        authController.verifyToken(token).then(function (data) {
            data.sub.should.equal(userToAdd.id);
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    it("throws an error on incorrect token", function (done) {
        var payload = { sub: userToAdd.id, exp: Math.floor(Date.now() / 1000) - 30};
        var token3 = jwt.sign(payload, "KJ2kjJK32LKJA'/.D[]");
        authController.verifyToken(token3).then(function (data) {
            done(new Error("verify function should throw error"));
        }).catch(function (err) {
            done();
        });
    });
    it("throws an error on incorrectly coded token", function (done) {
        var payload = { sub: userToAdd.id};
        var token3 = jwt.sign(payload, "bad key");
        authController.verifyToken(token3).then(function (data) {
            console.log(data);
            done(new Error("verify function should throw error"));
        }).catch(function (err) {
            done();
        });
    });
    after(function (done) {
        userController.remove(userToAdd.id)
            .then(function() {
                done();
            }).catch(function (err) {
                done(err);
            });
    });
});