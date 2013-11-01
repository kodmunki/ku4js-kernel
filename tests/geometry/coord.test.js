var $ = require('../../lib/base/__asserters'),
    $coord = require('../../lib/geometry/coord'),
    zero = $coord.zero(),
    pOne = $coord(1, 1),
    pTwo = $coord(2, 2),
    nOne = $coord(-1, -1),
    nTwo = $coord(-2, -2);

exports['create'] = function (test) {
    test.expect(8);
    test.throws(function(){ $coord(null, null); });
    test.throws(function(){ $coord(undefined, undefined); });
    test.throws(function(){ $coord("", ""); });
    test.throws(function(){ $coord("1", "1"); });
    test.throws(function(){ $coord("a", "a"); });
    test.ok($coord(0, 0));
    test.ok($coord(1, 1));
    test.ok($coord(-1, -1));
    test.done();
};
exports['equals'] = function (test) {
    test.expect(3);
    test.ok(pTwo.equals(pTwo));
    test.ok(nTwo.equals(nTwo));
    test.ok(zero.equals(zero));
    test.done();
};
exports['add'] = function (test) {
    test.expect(3);
    test.ok(pOne.add(pOne).equals(pTwo));
    test.ok(nOne.add(nOne).equals(nTwo));
    test.ok(pOne.add(nOne).equals(zero));
    test.done();
};
exports['subtract'] = function (test) {
    test.expect(3);
    test.ok(pTwo.subtract(pOne).equals(pOne));
    test.ok(nOne.subtract(nOne).equals(zero));
    test.ok(pOne.subtract(nOne).equals(pTwo));
    test.done();
};
exports['multiply'] = function (test) {
    test.expect(3);
    test.ok(pTwo.multiply(pOne).equals(pTwo));
    test.ok(nTwo.multiply(nOne).equals(pTwo));
    test.ok(pOne.multiply(zero).equals(zero));
    test.done();
};
exports['divide'] = function (test) {
    test.expect(3);
    test.ok(pTwo.divide(pOne).equals(pTwo));
    test.ok(nTwo.divide(nOne).equals(pTwo));
    test.ok(nTwo.divide(pTwo).equals(nOne));
    test.done();
};
exports['round'] = function (test) {
    test.expect(4);
    var nHigh = $coord(-1.4, -1.4),
        nLow = $coord(-1.6, -1.6),
        pHigh = $coord(1.6, 1.6),
        pLow = $coord(1.4, 1.4);

    test.ok(nHigh.round().equals(nOne));
    test.ok(nLow.round().equals(nTwo));
    test.ok(pHigh.round().equals(pTwo));
    test.ok(pLow.round().equals(pOne));
    test.done();
};
exports['half'] = function (test) {
    test.expect(1);
    test.ok(pTwo.half().equals(pTwo.divide(pTwo)));
    test.done();
};
exports['value'] = function (test) {
    test.expect(2);
    test.equal(pTwo.value().x, 2);
    test.equal(pTwo.value().y, 2);
    test.done();
};
exports['toString'] = function (test) {
    test.expect(1);
    test.equal(pTwo.toString(), "(2,2)");
    test.done();
};
exports['canParse'] = function (test) {
    test.expect(2);
    test.ok($coord.canParse({"top":1,"left":2}));
    test.ok(!$coord.canParse({"a":1,"b":2}));
    test.done();
};
exports['parse'] = function (test) {
    test.expect(2);
    test.ok($coord.parse({"top":1,"left":2}));
    test.throws(function(){ $coord.parse({"a":1,"b":2}); });
    test.done();
};
exports['tryParse'] = function (test) {
    test.expect(2);
    test.ok($coord.tryParse({"top":1,"left":2}).equals($coord(2,1)));
    test.equals($coord.tryParse({"a":1,"b":2}), null);
    test.done();
};