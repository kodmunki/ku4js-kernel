var $ = require('../../lib/base/__asserters'),
    $money = require('../../lib/finance/money'),
    two = $money(2.625),
    six = $money(6.125),
    sixAmps = $money(11, "&");

exports['create'] = function (test) {
    test.expect(8);
    test.throws(function(){$money(null);});
    test.throws(function(){$money(undefined);});
    test.ok($money(4));
    test.ok($money.parse("$5.99"));
    test.equal(two.cents(), .625);
    test.equal(two.dollars(), 2);
    test.equal(two.type(), "$");
    test.equal(two.value(), 2.625);
    test.done();
};
exports['add'] = function (test) {
    test.expect(8);
    test.throws(function(){six.add(null)});
    test.throws(function(){six.add(undefined);});
    test.throws(function(){six.add("");});
    test.throws(function(){six.add("2");});
    test.throws(function(){six.add(2);});
    test.throws(function(){six.add(sixAmps);});
    test.ok(six.add(two).equals($money(8.75)));
    test.ok(two.add(six).equals($money(8.75)));
    test.done();
};
exports['subtract'] = function (test) {
    test.expect(8);
    test.throws(function(){six.subtract(null)});
    test.throws(function(){six.subtract(undefined);});
    test.throws(function(){six.subtract("");});
    test.throws(function(){six.subtract("2");});
    test.throws(function(){six.subtract(2);});
    test.throws(function(){six.subtract(sixAmps);});
    test.ok(six.subtract(two).equals($money(3.50)));
    test.ok(two.subtract(six).equals($money(-3.50)));
    test.done();
};
exports['multiply'] = function (test) {
    test.expect(9);
    test.throws(function(){six.multiply(null)});
    test.throws(function(){six.multiply(undefined);});
    test.throws(function(){six.multiply("");});
    test.throws(function(){six.multiply("2");});
    test.throws(function(){six.multiply(sixAmps);});
    test.throws(function(){six.multiply(two);});
    test.throws(function(){two.multiply(six);});
    test.ok(six.multiply(2).equals($money(12.25)));
    test.ok(six.multiply(-2).equals($money(-12.25)));
    test.done();
};
exports['divide'] = function (test) {
    test.expect(9);
    test.throws(function(){six.divide(null)});
    test.throws(function(){six.divide(undefined);});
    test.throws(function(){six.divide("");});
    test.throws(function(){six.divide("2");});
    test.throws(function(){six.divide(sixAmps);});
    test.throws(function(){six.divide(two);});
    test.throws(function(){two.divide(six);});
    test.ok(six.divide(2).equals($money(3.0625)));
    test.ok(six.divide(-2).equals($money(-3.0625)));
    test.done();
};
exports['isOfType'] = function (test) {
    test.expect(1);
    test.ok(six.isOfType(two));
    test.done();
};
exports['isGreaterThan'] = function (test) {
    test.expect(1);
    test.ok(six.isGreaterThan(two));
    test.done();
};
exports['isLessThan'] = function (test) {
    test.expect(1);
    test.ok(two.isLessThan(six));
    test.done();
};
exports['toString'] = function (test) {
    test.expect(1);
    test.ok(two.toString("$2.13"));
    test.done();
};