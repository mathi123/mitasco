var Todo = new require("../shared/todo").Todo;
var expect = require("chai").expect;

describe("deep compare", function () {
    it("can compare dictionary with typescript objects", function () {
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