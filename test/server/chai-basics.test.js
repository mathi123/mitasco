var Todo = new require("../../bin/shared/todo").Todo;
var expect = require("chai").expect;

describe("Chai testing suite", function () {
    it("can compare dictionary with typescript objects (deep compare)", function () {
        var a = {
            description: "todo a",
            isDone: false,
            id: 0
        };

        var todoA = new Todo();
        todoA.description = "todo a";
        todoA.isDone = false;

        expect(a).to.eql(todoA);
    });
});