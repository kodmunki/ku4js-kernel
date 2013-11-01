var $ = require('../../lib/collections/list'),
    list =$();

exports['create'] = function (test) {
    test.expect(1);
    test.ok($());
    test.done();
};

exports['methods'] = function (test) {
    test.expect(14);
    var list = $();

    test.ok(list.isEmpty());

    list.add("one");
    test.equal(1, list.count(), "add(\"one\")");
    list.add("two");
    test.equal(2, list.count(), "add(\"two\")");
    list.add("three");
    test.equal(3, list.count(), "add(\"three\")");

    test.ok(list.contains("one"), "contains(\"one\")");
    test.equal("two", list.find(1), "find(1)");

    list.each(function(v){
        test.ok(/one|two|three/.test(v), "foreach");
    });

    test.ok(list.toArray() instanceof Array, "toArray")

    list.remove("two");
    test.equal(2, list.count(), "remove()");
    list.each(function(v){ test.ok(!/two/.test(v), "remove"); });
    list.clear();
    test.equal(0, list.count(), "clear()");
    test.done();
};