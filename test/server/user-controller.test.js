var UserController = require("../../bin/controllers/user.controller").UserController;
var should = require("should");

describe("UserController class", function () {
    var userToAdd = {
        fullname: "John Doe",
        email: Math.random() + "@gmail.com"
    };
    var controller = new UserController();

    it("can run a search query", function (done) {
        var searchArg = {
            query: "at",
            skip: 0,
            take: 50,
            sortColumn: "name",
            sortDirection: 0
        };

        controller.search(searchArg)
            .then(function (data) {
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    describe("when a user is created", function () {
        it("an id is returned", function (done) {
            controller.create(userToAdd, "test")
                .then(function (id) {
                    id.should.not.equal(0);
                    done();
                }).catch(function (err) {
                    done(err);
                });
        });
    });
});