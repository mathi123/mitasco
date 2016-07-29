var utils = require("../utils").Utils;
var expect = require("chai").expect;

describe("Utils class", function() {
    describe("isPositiveInteger function", function () {
        it("accepts integers", function () {
            expect(utils.isPositiveInteger(1)).to.equal(true);
            expect(utils.isPositiveInteger(23)).to.equal(true);
        });
        it("accepts zero", function () {
            expect(utils.isPositiveInteger(0)).to.equal(true);
        });
        it("rejects negative integers", function () {
            expect(utils.isPositiveInteger(-2)).to.equal(false);
        });
        it("rejects floats", function () {
            expect(utils.isPositiveInteger(1.234)).to.equal(false);
        });
        it("rejects negative floats", function () {
            expect(utils.isPositiveInteger(-12.34)).to.equal(false);
        });
        it("rejects null", function () {
            expect(utils.isPositiveInteger(null)).to.equal(false);
        });
        it("rejects empty strings", function () {
            expect(utils.isPositiveInteger('')).to.equal(false);
        });
        it("rejects strings", function () {
            expect(utils.isPositiveInteger('bla bla')).to.equal(false);
        });
        it("rejects arrays", function () {
            expect(utils.isPositiveInteger([2])).to.equal(false);
        });
        it("rejects NaN", function () {
            expect(utils.isPositiveInteger(NaN)).to.equal(false);
        });
        it("rejects infinity", function () {
            expect(utils.isPositiveInteger(Infinity)).to.equal(false);
        });
    });
    describe("arrayContains function", function() {
        it("handles empty arrays correctly", function () {
            expect(utils.arrayContains([], 1)).to.equal(false);
            expect(utils.arrayContains([], null)).to.equal(false);
        });
        it("returns true when the element is inside", function () {
            expect(utils.arrayContains([1], 1)).to.equal(true);
            expect(utils.arrayContains([1, 2, 3, 5], 5)).to.equal(true);
            expect(utils.arrayContains(['abc', 'dec'], 'abc')).to.equal(true);
            expect(utils.arrayContains([1, 2, 'a', 5], 'a')).to.equal(true);
        });
        it("returns false when the element is not inside", function () {
            expect(utils.arrayContains([2,3,4], 1)).to.equal(false);
            expect(utils.arrayContains(['abc'], 'a')).to.equal(false);
        });
    });
});
