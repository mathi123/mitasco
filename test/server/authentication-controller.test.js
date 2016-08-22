var UserController = require("../controllers/user.controller").UserController;
var AuthenticationController = require("../controllers/authentication.controller").AuthenticationController;
var should = require("should");

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
            });
    });

    it("validates correct password as true", function(done){
        var credentials = {
            email: userToAdd.email,
            password: password
        };
        authController.isValid(credentials).then(function(isValid){
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
        authController.isValid(credentials).then(function(isValid){
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
        authController.isValid(credentials).then(function(isValid){
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
        authController.isValid(credentials).then(function(isValid){
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
        authController.isValid(credentials).then(function(isValid){
            isValid.should.not.be.true();
            done();
        }).catch(function (error) {
            done(error);
        });
    });
});