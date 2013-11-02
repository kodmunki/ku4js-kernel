$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var list =$.list();

    module("list");

    test('create', function (test) {
        expect(1);
        ok($.list());
    });

    test('methods', function (test) {
        expect(14);
        var list = $.list();

        ok(list.isEmpty());

        list.add("one");
        equal(1, list.count(), "add(\"one\")");
        list.add("two");
        equal(2, list.count(), "add(\"two\")");
        list.add("three");
        equal(3, list.count(), "add(\"three\")");

        ok(list.contains("one"), "contains(\"one\")");
        equal("two", list.find(1), "find(1)");

        list.each(function(v){
            ok(/one|two|three/.test(v), "foreach");
        });

        ok(list.toArray() instanceof Array, "toArray")

        list.remove("two");
        equal(2, list.count(), "remove()");
        list.each(function(v){ ok(!/two/.test(v), "remove"); });
        list.clear();
        equal(0, list.count(), "clear()");
    });
});