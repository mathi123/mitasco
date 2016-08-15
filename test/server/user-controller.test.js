var UserController = require("../controllers/user.controller").UserController;
var should = require("should");

describe("UserController class", function () {
    var userToAdd = {
        fullname: "Mathias Colpaert",
        email: Math.random() + "@gmail.com"
    };

    describe("when created", function () {
        var controller;
        it("calls constructor correctly", function () {
            controller = new UserController();
        });
        it("can run a query", function (done) {
            var searchArg = {
                query: "at",
                skip: 0,
                take: 50,
                sortColumn: "name",
                sortDirection: 0
            };

            var result = controller.search(searchArg)
                .then(function (data) {
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    });

    describe("when create is called", function () {
        var controller = new UserController();

        it("an id is returned", function (done) {
            controller.create(userToAdd).then(function (id) {
                console.info("create succes " + id);
                id.should.not.equal(0);
                    done();
                })
                .catch(function (err) {
                done(err);
                });
        });
    });
});