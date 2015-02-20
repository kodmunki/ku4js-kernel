$(function() {

    module("fraction");

    test("create", function () {
        raises(function () { $.fraction(null, null); }, "");
        raises(function () { $.fraction(undefined, undefined); }, "");
        raises(function () { $.fraction("", ""); }, "");
        raises(function () { $.fraction("1", "1"); }, "");
        raises(function () { $.fraction("a", "a"); }, "");

        ok($.fraction(0, 0));
        ok($.fraction(1, 1));
        ok($.fraction(-1, -1));
    });

    test("numerator", function () {
        var fraction = $.fraction(2,3);

        expect(1);
        equal(fraction.numerator(), 2);
    });

    test("denominator", function () {
        var fraction = $.fraction(2,3);

        expect(1);
        equal(fraction.denominator(), 3);
    });

    test("equals", function () {
        var fraction = $.fraction(2,3);

        expect(1);
        ok(fraction.equals(fraction));
    });

    test("value", function () {
        var fraction = $.fraction(2,5);

        expect(1);
        equal(fraction.value(), .4);
    });

    test("add", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(3,2),
            fraction = fractionA.add(fractionB);

        expect(3);
        equal(fraction.numerator(), 13);
        equal(fraction.denominator(), 6);
        equal($.math.round(fraction.value(), -3), 2.167);
    });

    test("subtract", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(3,2),
            fraction = fractionA.subtract(fractionB);

        expect(3);
        equal(fraction.numerator(), -5);
        equal(fraction.denominator(), 6);
        equal($.math.round(fraction.value(), -3), -.833);
    });

    test("multiply", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(4,2),
            fraction = fractionA.multiply(fractionB);

        expect(3);
        equal(fraction.numerator(), 8);
        equal(fraction.denominator(), 6);
        equal($.math.round(fraction.value(), -3), 1.333);
    });

    test("divide", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(4,2),
            fraction = fractionA.divide(fractionB);

        expect(3);
        equal(fraction.numerator(), 4);
        equal(fraction.denominator(), 12);
        equal($.math.round(fraction.value(), -3), .333);
    });

    test("reciprocal", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(3,2);

        expect(1);
        ok(fractionA.equals(fractionB.reciprocal()));
    });

    test("commonDenominator", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(3,2);

        expect(1);
        equal(fractionA.commonDenominator(fractionB), 6);
    });

    test("withDenominator", function () {
        var fractionA = $.fraction(2,3),
            fractionB = $.fraction(4,6);

        expect(2);
        ok(fractionA.withDenominator(6).equals(fractionB));

        performanceOk(function(){ fractionA.withDenominator(6).equals(fractionB) }, 1);

    });

    test("simplify", function () {
        var fraction = $.fraction(118,410),
            simple = fraction.simplify();

        expect(4);
        equal(simple.numerator(), 59);
        equal(simple.denominator(), 205);
        ok(fraction.equals(simple));

        performanceOk(function(){ simple.denominator(); }, 1);
    });

    test("toString", function () {
        expect(1);
        equal($.fraction(2,3).toString(), "2/3");
    });
});