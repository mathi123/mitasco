var util = require("../shared/deserialize-util").DeserializeUtil;
var KeyNotFoundException = require("../shared/deserialize-util").KeyNotFoundException;
var InvalidTypeException = require("../shared/deserialize-util").InvalidTypeException;
var Todo = new require("../shared/todo").Todo;
var expect = require("chai").expect;

describe("DeserializeUtil", function() {
    describe("StrictString", function () {
        it("accepts non-empty string", function () {
            expect(util.StrictString("abc")).to.equal("abc");
        });
        it("accepts empty string", function () {
            expect(util.StrictString("")).to.equal("");
        });
        it("rejects null", function () {
            expect(function () {
                util.StrictString(null);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects undefined", function () {
            var val;
            expect(function() {
                util.StrictString(val);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects booleans", function () {
            expect(function () {
                util.StrictString(true);
            }).to.throw(InvalidTypeException);
        });
        it("rejects numbers", function () {
            expect(function () {
                util.StrictString(123);
            }).to.throw(InvalidTypeException);
        });
    });
    describe("StrictNumber", function () {
        it("accepts integers", function () {
            expect(util.StrictNumber(123)).to.equal(123);
        });
        it("accepts floats", function () {
            expect(util.StrictNumber(123.123)).to.equal(123.123);
        });
        it("rejects null", function () {
            expect(function () {
                util.StrictNumber(null);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects undefined", function () {
            var val;
            expect(function() {
                util.StrictNumber(val);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects booleans", function () {
            expect(function () {
                util.StrictNumber(true);
            }).to.throw(InvalidTypeException);
        });
        it("rejects strings", function () {
            expect(function () {
                util.StrictNumber("");
            }).to.throw(InvalidTypeException);
        });
    });
    describe("StrictBoolean", function () {
        it("accepts booleans", function () {
            expect(util.StrictBoolean(true)).to.equal(true);
            expect(util.StrictBoolean(false)).to.equal(false);
        });
        it("rejects null", function () {
            expect(function () {
                util.StrictBoolean(null);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects undefined", function () {
            var val;
            expect(function() {
                util.StrictBoolean(val);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects numbers", function () {
            expect(function () {
                util.StrictBoolean(123);
            }).to.throw(InvalidTypeException);
        });
        it("rejects strings", function () {
            expect(function () {
                util.StrictNumber("");
            }).to.throw(InvalidTypeException);
        });
    });
    describe("StrictStringArray", function () {
        it("accepts empty arrays", function () {
            expect(util.StrictStringArray([])).to.eql([]);
        });
        it("accepts full string arrays", function () {
            expect(util.StrictStringArray(["a","b","c"])).to.eql(["a","b","c"]);
        });
        it("reject full number arrays", function () {
            expect(function () {
                util.StrictStringArray([1,2,3]);
            }).to.throw(InvalidTypeException);
        });
        it("rejects null", function () {
            expect(function () {
                util.StrictStringArray(null);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects undefined", function () {
            var val;
            expect(function() {
                util.StrictStringArray(val);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects numbers", function () {
            expect(function () {
                util.StrictStringArray(123);
            }).to.throw(InvalidTypeException);
        });
        it("rejects strings", function () {
            expect(function () {
                util.StrictStringArray("");
            }).to.throw(InvalidTypeException);
        });
        it("rejects booleans", function () {
            expect(function () {
                util.StrictStringArray(false);
            }).to.throw(InvalidTypeException);
        });
        it("rejects arrays with null child", function () {
            expect(function () {
                util.StrictStringArray(["good", null]);
            }).to.throw(KeyNotFoundException);
        });
        it("rejects arrays with undefined child", function () {
            expect(function () {
                var a;
                util.StrictStringArray(["good", a]);
            }).to.throw(KeyNotFoundException);
        });
    });
    describe("StrictObjectArray", function () {
        it("accepts empty arrays", function () {
            expect(util.StrictObjectArray([], function () {
                return new Todo();
            })).to.eql([]);
        });
        it("accepts full arrays", function () {
            var a = {
                description: "todo a",
                isDone: false,
                id: 0
            };

            var b = {
                description: "todo b",
                isDone: true,
                id: 0
            };

            var todoA = new Todo();
            todoA.description = "todo a";
            todoA.isDone = false;

            var todoB = new Todo();
            todoB.description = "todo b";
            todoB.isDone = true;

            expect(util.StrictObjectArray([a,b], function () {
                return new Todo();
            })).to.eql([todoA, todoB]);
        });
        it("reject full number arrays", function () {
            expect(function () {
                util.StrictObjectArray([1,2,3], function () {
                    return new Todo();
                });
            }).to.throw(KeyNotFoundException);
        });
        it("rejects null", function () {
            expect(function () {
                util.StrictObjectArray(null, function () {
                    return new Todo();
                });
            }).to.throw(KeyNotFoundException);
        });
        it("rejects undefined", function () {
            var val;
            expect(function() {
                util.StrictObjectArray(val, function () {
                    return new Todo();
                });
            }).to.throw(KeyNotFoundException);
        });
        it("rejects numbers", function () {
            expect(function () {
                util.StrictObjectArray(123, function () {
                    return new Todo();
                });
            }).to.throw(InvalidTypeException);
        });
        it("rejects strings", function () {
            expect(function () {
                util.StrictObjectArray("", function () {
                    return new Todo();
                });
            }).to.throw(InvalidTypeException);
        });
        it("rejects booleans", function () {
            expect(function () {
                util.StrictObjectArray(false, function () {
                    return new Todo();
                });
            }).to.throw(InvalidTypeException);
        });
        it("rejects arrays with null child", function () {
            expect(function () {
                util.StrictObjectArray(["good", null], function () {
                    return new Todo();
                });
            }).to.throw(KeyNotFoundException);
        });
        it("rejects arrays with undefined child", function () {
            expect(function () {
                var a;
                util.StrictObjectArray(["good", a], function () {
                    return new Todo();
                });
            }).to.throw(KeyNotFoundException);
        });
    });
});