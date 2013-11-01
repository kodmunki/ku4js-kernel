var $ = require('../../lib/base/_obj'),
    obj1 = {"one":1, "two":2, "three":3 },
    obj2 = {"three":7, "four":4, "five":5, "six":6 };

exports['keys'] = function (test) {
    var keys = $.keys(obj1),
        testValues = ["one", "two", "three"],
        i = 0, l = testValues.length;

    while(i < l) {
        test.equal(keys[i], testValues[i]);
        i++;
    }
    test.done();
};

exports['values'] = function (test) {
    var values = $.values(obj1),
        testValues = [1, 2, 3],
        i = 0, l = testValue.length;

    while(i < l) {
        test.equal(values[i], testValues[i]);
        i++;
    }
    test.done();
};

exports['values'] = function (test) {
    var values = $.values(obj1),
        testValues = [1, 2, 3],
        i = 0, l = testValues.length;

    while(i < l) {
        test.equal(values[i], testValues[i]);
        i++;
    }
    test.done();
};

exports['count'] = function (test) {
    test.expect(2);
    test.equal($.count(obj1), 3);
    test.equal($.count(obj2), 4);
    test.done();
};

exports['hasProp'] = function (test) {
    test.expect(4);
    test.ok($.hasProp(obj1, "one"));
    test.ok($.hasProp(obj1, "two"));
    test.ok($.hasProp(obj1, "three"));
    test.ok(!$.hasProp(obj1, "four"));
    test.done();
}

exports['merge'] = function (test) {
    var merge = $.merge(obj1, obj2);
    test.expect(6);
    test.equal($.count(merge), 6);
    test.equal($.count(obj1), 3);
    test.equal($.count(obj2), 4);
    test.equal(merge.one, obj1.one);
    test.equal(merge.six, obj2.six);
    test.equal(merge.three, obj1.three);
    test.done();
};

exports['meld'] = function (test) {
    var meld = $.meld(obj1, obj2);
    test.expect(6);
    test.equal($.count(meld), 6);
    test.equal($.count(obj1), 3);
    test.equal($.count(obj2), 4);
    test.equal(meld.one, obj1.one);
    test.equal(meld.six, obj2.six);
    test.equal(meld.three, obj2.three);
    test.done();
};