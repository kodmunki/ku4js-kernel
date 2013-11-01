var $ = require('../../lib/base/__asserters'),
    $coord = require('../../lib/geometry/coord'),
    $rectangle = require('../../lib/geometry/rectangle'),
    rectangle1 = $rectangle($coord.zero(), $coord(6,5)),
    rectangle2 = $rectangle($coord(5,5), $coord(10,10));

exports['create'] = function (test) {
    test.expect(1);
    test.ok($rectangle($coord.zero(), $coord(6,5)));
    test.done();
};
exports['topLeft'] = function (test) {
    test.expect(2);
    test.ok(rectangle1.topLeft().equals($coord.zero()));
    test.ok(rectangle2.topLeft().equals($coord(5,5)));
    test.done();
};
exports['bottomRight'] = function (test) {
    test.expect(2);
    test.ok(rectangle1.bottomRight().equals($coord(6,5)));
    test.ok(rectangle2.bottomRight().equals($coord(15,15)));
    test.done();
};
exports['bottomRight'] = function (test) {
    test.expect(2);
    test.ok(rectangle1.center().equals($coord(3,2.5)));
    test.ok(rectangle2.center().equals($coord(7.5,7.5)));
    test.done();
};
exports['contains'] = function (test) {
    test.expect(14);
    test.ok(rectangle1.contains($coord(1,1)));
    test.ok(rectangle1.contains($coord(4,4)));
    test.ok(rectangle1.contains(rectangle1.center()));
    test.ok(!rectangle1.contains($coord.zero()));
    test.ok(!rectangle1.contains($coord(6,5)));
    test.ok(!rectangle1.contains($coord(6,6)));
    test.ok(!rectangle1.contains($coord(-1,-1)));

    test.ok(rectangle2.contains($coord(6,6)));
    test.ok(rectangle2.contains($coord(8,8)));
    test.ok(rectangle2.contains(rectangle2.center()));
    test.ok(!rectangle2.contains($coord.zero()));
    test.ok(!rectangle2.contains($coord(15,15)));
    test.ok(!rectangle2.contains($coord(15,16)));
    test.ok(!rectangle2.contains($coord(-1,-1)));

    test.done();
};

