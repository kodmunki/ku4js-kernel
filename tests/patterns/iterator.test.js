$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("iterator");

    test('create', function () {
        expect(1);
        ok($.iterator());
    });

    test('propertySubject', function () {
        expect(32);
        var iterator = $.iterator(),
            array = [1,2,3,4,5],
            obj = {"one":1, "two":2, "three":3, "four":4, "five":5},
            list = $.list(array).toArray(),
            hash = $.hash(obj).toObject();

        function _test(it){
            ok(it.current());
            ok(it.next());
            ok(it.prev());
            it.each(function(c){
                equal(it.current(), c);
            })
        }

        iterator.subject(array); _test(iterator);
        iterator.subject(obj); _test(iterator);
        iterator.subject(list); _test(iterator);
        iterator.subject(hash); _test(iterator);
    });

    test('methods', function () {
        expect(18);
        var arr = [1, 2, 3],
            obj = { "a": 1, "b": 2, "c": 3 },
            chk = [0,1,2,3,4,5],
            arrayIterator1 = $.iterator([1,2,3,4,5]),
            arrayIterator2 = $.iterator(arr);

        function runTests1(t, it) {
            ok(it.hasNext());
            ok(!it.hasPrev());
            equal(1, it.current());
            equal(2, it.next());
            equal(1, it.prev());
            equal(1, it.current());

            it.each(function(c){ equal(c, chk[c]); });
        }

        function runTests2(t, it) {
            equal(1, it.current());
            ok(!$.exists(it.prev()));
            equal(2, it.next());
            ok(it.hasNext());
            ok(it.hasPrev());
            equal(3, it.next());
            ok(!$.exists(it.next()));
        }

        runTests1("arrayIterator1", arrayIterator1);
        runTests2("arrayIterator2", arrayIterator2);
    });
});