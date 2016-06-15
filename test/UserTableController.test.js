var UserTableController = require("../bin/DataStore/UserTableController").UserTableController;
var expect = require("chai").expect;
var should = require("should");

describe("UserTableController class", function () {
    var userToAdd = {
        fullname: "Mathias Colpaert",
        email: Math.random() + "@gmail.com"
    };

    describe("when created", function () {
        var controller;
        it("calls constructor correctly", function () {
            controller = new UserTableController();
        });
        it("connects to database", function () {
            controller.connect();
        });
        it("can run a query", function (done) {
            var searchArg = {
                query: "at",
                skip: 0,
                take: 50,
                sortColumn: "name",
                sortDirection: 0
            };

            var result = controller.search(searchArg, function (data) {
                //expect(data.count).to.be.greaterThan(0);
                console.log(data);
                done();
            }, function (err) {
                done(err);
            });
        });
        it("closes database connection", function () {
            controller.close();
        });
    });

    describe("when create is called", function () {
        var controller = new UserTableController();

        controller.connect();

        it("an id is returned", function (done) {
            controller.create(userToAdd, function (id) {
                console.info("create succes " + id);
                id.should.not.equal(0);

                controller.read(id, function (data) {
                    console.info("read succes " + data);

                    userToAdd.email.should.equal(data.email);
                    userToAdd.fullname.should.equal(data.fullname);

                    data.fullname = "testname";

                    controller.update(data, function () {
                        controller.read(id, function (dataupdated) {
                            console.info("update succes");

                            dataupdated.fullname.should.equal(data.fullname);

                            done();
                        }, function (err) {
                            done(err);
                        });
                    }, function (err) {
                        done(err);
                    });
                }, function (err) {
                    done(err);
                });
            }, function (err) {
                done(err);
            })
        });
    });
});