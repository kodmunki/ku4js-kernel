$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("rolodex");

    test('create', function (test) {
        expect(1);
        ok($.rolodex());
    });

    test('methods', function (test) {
        var arr = [1, 2, 3],
            obj = { "a": 1, "b": 2, "c": 3 },
            chk = [0,1,2,3,4,5],
            arrayIterator1 = $.rolodex([1,2,3,4,5]),
            arrayIterator2 = $.rolodex(arr);

        expect(18);
        function runTests1(t, it) {
            ok(it.hasNext());
            ok(it.hasPrev());
            equal(it.current(), 1);
            equal(it.next(), 2);
            equal(it.prev(), 1);
            equal(it.current(), 1);

            it.each(function(c){ equal(c, chk[c]); });
        }

        function runTests2(t, it) {
            equal(it.current(), 1);
            ok($.exists(it.prev()));
            equal(it.next(), 1);
            ok(it.hasNext(), "hasNext");
            ok(it.hasPrev(), "hasPrev");
            equal(it.next(), 2);
            ok($.exists(it.next()));
        }

        runTests1("arrayIterator1", arrayIterator1);
        runTests2("arrayIterator2", arrayIterator2);
    });
});