var $ = require('../../lib/base/__asserters'),
    $rolodex = require('../../lib/patterns/rolodex');

exports['create'] = function (test) {
    test.expect(1);
    test.ok($rolodex());
    test.done();
};

exports['methods'] = function (test) {
    var arr = [1, 2, 3],
        obj = { "a": 1, "b": 2, "c": 3 },
        chk = [0,1,2,3,4,5],
        arrayIterator1 = new $rolodex([1,2,3,4,5]),
        arrayIterator2 = new $rolodex(arr);

    test.expect(18);
    function runTests1(t, it) {
        test.ok(it.hasNext());
        test.ok(it.hasPrev());
        test.equal(it.current(), 1);
        test.equal(it.next(), 2);
        test.equal(it.prev(), 1);
        test.equal(it.current(), 1);

        it.each(function(c){ test.equal(c, chk[c]); });
    }

    function runTests2(t, it) {
        test.equal(it.current(), 1);
        test.ok($.exists(it.prev()));
        test.equal(it.next(), 1);
        test.ok(it.hasNext(), "hasNext");
        test.ok(it.hasPrev(), "hasPrev");
        test.equal(it.next(), 2);
        test.ok($.exists(it.next()));
    }

    runTests1("arrayIterator1", arrayIterator1);
    runTests2("arrayIterator2", arrayIterator2);
    test.done();
};