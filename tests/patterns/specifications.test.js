var $ = require('../../lib/patterns/specification'),
    True = $(function(v){return v == true;}),
    False = $(function(v){return v == false;});

exports['create'] = function (test) {
    var lock1 = $(),
        lock2 = $(false),
        lock3 = $(true);

    test.expect(1);
    test.ok($(function(v){return v == true;}));
    test.done();
};

exports['and'] = function (test) {
    test.expect(8);
    test.ok(True.and(True).isSatisfiedBy(true));
    test.ok(!True.and(True).isSatisfiedBy(false));
    test.ok(!False.and(False).isSatisfiedBy(true));
    test.ok(False.and(False).isSatisfiedBy(false));
    test.ok(!True.and(False).isSatisfiedBy(true));
    test.ok(!True.and(False).isSatisfiedBy(false));
    test.ok(!False.and(True).isSatisfiedBy(true));
    test.ok(!False.and(True).isSatisfiedBy(false));
};

exports['or'] = function (test) {
    test.expect(8);
    test.ok(True.or(True).isSatisfiedBy(true));
    test.ok(!True.or(True).isSatisfiedBy(false));
    test.ok(!False.or(False).isSatisfiedBy(true));
    test.ok(False.or(False).isSatisfiedBy(false));
    test.ok(True.or(False).isSatisfiedBy(true));
    test.ok(True.or(False).isSatisfiedBy(false));
    test.ok(False.or(True).isSatisfiedBy(true));
    test.ok(False.or(True).isSatisfiedBy(false));
};

exports['xor'] = function (test) {
    test.expect(8);
    test.ok(!True.xor(True).isSatisfiedBy(true));
    test.ok(!True.xor(True).isSatisfiedBy(false));
    test.ok(!False.xor(False).isSatisfiedBy(true));
    test.ok(!False.xor(False).isSatisfiedBy(false));
    test.ok(True.xor(False).isSatisfiedBy(true));
    test.ok(True.xor(False).isSatisfiedBy(false));
    test.ok(False.xor(True).isSatisfiedBy(true));
    test.ok(False.xor(True).isSatisfiedBy(false));
};

exports['not'] = function (test) {
    test.expect(4);
    test.ok(!True.not().isSatisfiedBy(true));
    test.ok(True.not().isSatisfiedBy(false));
    test.ok(False.not().isSatisfiedBy(true));
    test.ok(!False.not().isSatisfiedBy(false));
};