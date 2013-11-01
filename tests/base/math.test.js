var $ = require('../../lib/base/math');

exports['methods round'] = function (test) {
    test.expect(10);
    test.equal($.round(0), 0);
    test.equal($.round(555.555, -4), 555.555, "-4");
    test.equal($.round(555.555, -3), 555.555, "-3");
    test.equal($.round(555.555, -2), 555.56, "-2");
    test.equal($.round(555.555, -1), 555.6, "-1");
    test.equal($.round(555.555, 0), 556, "0");
    test.equal($.round(555.555, 1), 560, "1");
    test.equal($.round(555.555, 2), 600, "2");
    test.equal($.round(555.555, 3), 1000, "3");
    test.equal($.round(555.555, 4), 0, "4");
    test.done();
};

exports['methods roundUp'] = function (test) {
    test.expect(10);
    test.equal($.roundUp(0), 1);
    test.equal($.roundUp(555.554, -4), 555.5541, "-4");
    test.equal($.roundUp(555.554, -3), 555.555, "-3");
    test.equal($.roundUp(555.554, -2), 555.56, "-2");
    test.equal($.roundUp(555.554, -1), 555.6, "-1");
    test.equal($.roundUp(555.554, 0), 556, "0");
    test.equal($.roundUp(555.554, 1), 560, "1");
    test.equal($.roundUp(555.554, 2), 600, "2");
    test.equal($.roundUp(555.554, 3), 1000, "3");
    test.equal($.roundUp(555.554, 4), 10000, "4");
    test.done();
};

exports['methods roundDown'] = function (test) {
    test.expect(10);
    test.equal($.roundUp(0), 1);
    test.equal($.roundUp(555.554, -4), 555.5541, "-4");
    test.equal($.roundUp(555.554, -3), 555.555, "-3");
    test.equal($.roundUp(555.554, -2), 555.56, "-2");
    test.equal($.roundUp(555.554, -1), 555.6, "-1");
    test.equal($.roundUp(555.554, 0), 556, "0");
    test.equal($.roundUp(555.554, 1), 560, "1");
    test.equal($.roundUp(555.554, 2), 600, "2");
    test.equal($.roundUp(555.554, 3), 1000, "3");
    test.equal($.roundUp(555.554, 4), 10000, "4");
    test.done();
};