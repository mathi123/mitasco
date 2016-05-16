var utc = require("../bin/DataStore/UserTableController");
var expect = require("chai").expect;


describe("UserTableController class", function () {
    describe("when created", function () {
        var controller;
        it("calls constructor correctly", function () {
            controller = new utc.UserTableController();
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
                expect(data.count).to.be.greaterThan(0);
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
});