var $ = require('../../lib/base/uid');

exports['uid'] = function (test) {
    test.expect(2);
    test.ok(/uid\d+/.test($()));
    test.ok(/myID\d+/.test($("myID")));
    test.done();
};