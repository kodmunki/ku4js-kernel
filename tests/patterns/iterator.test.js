var $ = require('../../lib/base/__asserters'),
    $hash = require('../../lib/collections/hash'),
    $list = require('../../lib/collections/list'),
    $iterator = require('../../lib/patterns/iterator');

exports['create'] = function (test) {
    test.expect(1);
    test.ok($iterator());
    test.done();
};

exports['propertySubject'] = function (test) {
    test.expect(64);
    var iterator = $iterator(),
        array = [1,2,3,4,5],
        obj = {"one":1, "two":2, "three":3, "four":4, "five":5};
        list = $list(array),
        hash = $hash(obj);

    function _test(it){
        test.ok(it.current());
        test.ok(it.next());
        test.ok(it.prev());
        it.each(function(c){
            test.equal(it.current(), c);
        })
    }

    iterator.subject(array); _test(iterator);
    iterator.subject(obj); _test(iterator);
    iterator.subject(list); _test(iterator);
    iterator.subject(hash); _test(iterator);
    test.done();
};

exports['methods'] = function (test) {
    test.expect(18);
    var arr = [1, 2, 3],
        obj = { "a": 1, "b": 2, "c": 3 },
        chk = [0,1,2,3,4,5],
        arrayIterator1 = $iterator([1,2,3,4,5]),
        arrayIterator2 = $iterator(arr);

    function runTests1(t, it) {
        test.ok(it.hasNext());
        test.ok(!it.hasPrev());
        test.equal(1, it.current());
        test.equal(2, it.next());
        test.equal(1, it.prev());
        test.equal(1, it.current());

        it.each(function(c){ test.equal(c, chk[c]); });
    }

    function runTests2(t, it) {
        test.equal(1, it.current());
        test.ok(!$.exists(it.prev()));
        test.equal(2, it.next());
        test.ok(it.hasNext());
        test.ok(it.hasPrev());
        test.equal(3, it.next());
        test.ok(!$.exists(it.next()));
    }

    runTests1("arrayIterator1", arrayIterator1);
    runTests2("arrayIterator2", arrayIterator2);
    test.done();
};