var $ = require('../../lib/base/__asserters'),
    $coord = require('../../lib/geometry/coord'),
    $point = require('../../lib/geometry/point'),
    $vector = require('../../lib/geometry/vector'),
    zero = $point.zero(),
    pOne = $point(1, 1),
    pTwo = $point(2, 2),
    nOne = $point(-1, -1),
    nTwo = $point(-2, -2);

exports['create'] = function (test) {
    test.expect(8);
    test.throws(function(){ $point(null, null); });
    test.throws(function(){ $point(undefined, undefined); });
    test.throws(function(){ $point("", ""); });
    test.throws(function(){ $point("1", "1"); });
    test.throws(function(){ $point("a", "a"); });
    test.ok($point(0, 0));
    test.ok($point(1, 1));
    test.ok($point(-1, -1));
    test.done();
};
exports['isAbove'] = function (test) {
    test.expect(2);
    test.ok(!pOne.isAbove(zero));
    test.ok(pOne.isAbove(pTwo));
    test.done();
};
exports['isBelow'] = function (test) {
    test.expect(2);
    test.ok(pOne.isBelow(zero));
    test.ok(!pOne.isBelow(pTwo));
    test.done();
};
exports['isLeftOf'] = function (test) {
    test.expect(2);
    test.ok(!pOne.isLeftOf(zero));
    test.ok(pOne.isLeftOf(pTwo));
    test.done();
};
exports['isRightOf'] = function (test) {
    test.expect(2);
    test.ok(pOne.isRightOf(zero));
    test.ok(!pOne.isRightOf(pTwo));
    test.done();
};
exports['distanceFrom'] = function (test) {
    test.expect(1);
    test.ok(pTwo.distanceFrom(pOne).equals($vector(1, 1)));
    test.done();
};
exports['distanceTo'] = function (test) {
    test.expect(1);
    test.ok(pTwo.distanceTo(pOne).equals($vector(-1, -1)));
    test.done();
};
exports['canParse'] = function (test) {
    test.expect(2);
    test.ok($point.canParse($coord(1,2)));
    test.ok(!$point.canParse({"a":1,"b":2}));
    test.done();
};
exports['parse'] = function (test) {
    test.expect(2);
    test.ok($point.parse($coord(1,2)));
    test.throws(function(){ $point.parse({"a":1,"b":2}); });
    test.done();
};
exports['tryParse'] = function (test) {
    test.expect(2);
    test.ok($point.tryParse($coord(1,2)).equals($point(1,2)));
    test.equals($point.tryParse({"a":1,"b":2}), null);
    test.done();
};