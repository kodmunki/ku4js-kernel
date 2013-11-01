var $ = require('../../lib/base/__asserters'),
    $vector = require('../../lib/geometry/vector'),
    zero = $vector.zero(),
    pOne = $vector(1, 1),
    pTwo = $vector(2, 2),
    nOne = $vector(-1, -1),
    nTwo = $vector(-2, -2);

exports['create'] = function (test) {
    test.expect(8);
    test.throws(function(){ $vector(null, null); });
    test.throws(function(){ $vector(undefined, undefined); });
    test.throws(function(){ $vector("", ""); });
    test.throws(function(){ $vector("1", "1"); });
    test.throws(function(){ $vector("a", "a"); });
    test.ok($vector(0, 0));
    test.ok($vector(1, 1));
    test.ok($vector(-1, -1));
    test.done();
};
exports['equals'] = function (test) {
    test.expect(3);
    test.ok(pTwo.equals(pTwo));
    test.ok(nTwo.equals(nTwo));
    test.ok(zero.equals(zero));
    test.done();
};
exports['round'] = function (test) {
    test.expect(1);
    test.ok($vector(.345, .345).round(-2).equals($vector(.35, .35)));
    test.done();
};
exports['normal'] = function (test) {
    test.expect(1);
    test.ok(pOne.normal().round(-3).equals($vector(.707,.707)));
    test.done();
};
exports['invert'] = function (test) {
    test.expect(1);
    test.ok(nOne.invert().equals(pOne));
    test.done();
};
exports['norm'] = function (test) {
    test.expect(1);
    test.ok(nOne.norm().equals(pOne));
    test.done();
};
exports['perpendicular'] = function (test) {
    test.expect(1);
    test.ok(pOne.perpendicular().equals($vector(-1, 1)));
    test.done();
};
exports['isZero'] = function (test) {
    test.expect(2);
    test.ok($vector(0,0).isZero());
    test.ok(!$vector(1,1).isZero());
    test.done();
};
exports['add'] = function (test) {
    test.expect(3);
    test.ok(pOne.add(pOne).equals(pTwo));
    test.ok(nOne.add(nOne).equals(nTwo));
    test.ok(pOne.add(nOne).isZero());
    test.done();
};
exports['dot'] = function (test) {
    test.expect(1);
    test.equal(pOne.dot(pTwo), 4);
    test.done();
};
exports['perpendicularAtTo'] = function (test) {
    test.expect(2);
    test.ok(pOne.perpendicularAtTo(pTwo).round().equals(pOne));
    test.ok(pOne.perpendicularAtTo(nOne).round().equals(nTwo));
    test.done();
};
exports['projectionOfOnto'] = function (test) {
    test.expect(2);
    test.ok(pOne.projectionOfOnto(pOne).round().equals(pOne));
    test.ok(pOne.projectionOfOnto(nOne).round().equals(pOne));
    test.done();
};
exports['scale'] = function (test) {
    test.expect(1);
    test.ok(pOne.scale(2).equals(pTwo));
    test.done();
};
exports['reflect'] = function (test) {
    test.expect(1);
    test.ok(pOne.reflect($vector(0, 1)).equals($vector(1, -1)));
    test.done();
};