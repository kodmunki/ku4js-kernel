$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("hash");

    test('create', function () {
        expect(2);
        ok($.hash());
        ok($.hash().isTypeOf($.hash.Class));
    });
    
    test('add', function () {
        var hash = $.hash();

        expect(10);
        ok(hash.isEmpty());

        raises(function() { hash.add(null, 0) }, "Invalid key: null");
        raises(function() { hash.add(undefined, 0) }, "Invalid key: undefined");
        raises(function() { hash.add("null", 0); }, "Invalid key: null");
        raises(function() { hash.add("undefined", 0); }, "Invalid key: undefined");

        hash.add("zero", 0);
        equal(hash.count(), 1, "add(\"zero\", 0)");
        hash.add("empty", "");
        equal(hash.count(), 2, "add(\"empty\", \"\")");
        hash.add("date", new Date(2013, 1, 1));
        equal(hash.count(), 3, "add(\"date\",new Date(2013, 1, 1))");

        raises(function() { hash.add("empty", 3); }, "Invalid key: duplicate");
        equal(hash.count(), 3, "Invalid key: duplicate");
    });
    
    test('meld', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(3);
        hash.meld($.hash({"three":3}));
        equal(hash.count(), 4,  "meld");
        hash.meld({"three":4});
        equal(hash.count(), 4,  "meld");
        equal(hash.findValue("three"), 3, "meld duplicate");
    });
    
    test('merge', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(2);
        hash.merge({"three":4});
        equal(4, hash.findValue("three"), "merge duplicate");
        hash.merge($.hash({"three":5}));
        equal(5, hash.findValue("three"), "merge duplicate");
    });
    
    test('containsKey', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(4);
        ok(!hash.containsKey("null"), "containsKey(\"null\")");
        ok(!hash.containsKey("undefined"), "containsKey(\"undefined\")");
        ok(!hash.containsKey("five"), "!containsKey(\"five\")");
        ok(hash.containsKey("zero"), "containsKey(\"zero\")");
    });
    
    test('containsValue', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(5);
        ok(!hash.containsValue(null), "containsValue(null)");
        ok(!hash.containsValue(undefined), "containsValue(undefined)");
        ok(hash.containsValue(0), "containsValue(0)");
        ok(hash.containsValue(""), "containsValue(\"\")");
        ok(hash.containsValue(new Date(2013, 1, 1)), "containsValue(new Date(2013, 1, 1))");
    });

    test('contains', function () {
        var hash = $.hash({
            "a": 1,
            "b": 2,
            "c": 3
        });

        expect(16);
        ok(!hash.contains(null), "contains(null)");
        ok(!hash.contains(undefined), "contains(undefined)");
        ok(!hash.contains(0), "contains(0)");
        ok(!hash.contains(""), "contains(\"\")");
        ok(!hash.contains({}), 'contains({})');
        ok(!hash.contains({"a": 1, "b": 2, "d": 3}), 'contains({"a": 1, "b": 2, "d": 3})');
        ok(!hash.contains({"a": 1, "b": 2, "c": 4}), 'contains({"a": 1, "b": 2, "c": 4})');
        ok(!hash.contains({"a": 1, "b": 2, "c": 3, "d": 4}), 'contains({"a": 1, "b": 2, "c": 3, "d": 4})');
        ok(!hash.contains($.hash({"a": 1, "b": 2, "c": 4})), '$.hash({"a": 1, "b": 2, "c": 4})');
        ok(!hash.contains($.hash({"a": 1, "b": 2, "c": 3, "d": 4})), '$.hash({"a": 1, "b": 2, "c": 3, "d": 4})');

        ok(hash.contains({"a": 1, "b": 2}), 'contains({"a": 1, "b": 2})');
        ok(hash.contains({"a": 1, "c": 3}), 'contains({"a": 1, "c": 3})');
        ok(hash.contains({"a": 1, "b": 2, "c": 3}), 'contains({"a": 1, "b": 2, "c": 3})');
        ok(hash.contains($.hash({"a": 1, "b": 2})), 'contains($.hash({"a": 1, "b": 2}))');
        ok(hash.contains($.hash({"a": 1, "c": 3})), 'contains($.hash({"a": 1, "c": 3}))');
        ok(hash.contains($.hash({"a": 1, "b": 2, "c": 3})), 'contains($.hash({"a": 1, "b": 2, "c": 3}))');
    });

    test('filter', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        }).filter("zero", "date");

        expect(5);
        ok(hash.containsKey("zero"), "containsKey(\"zero\")");
        ok(hash.containsKey("date"), "containsKey(\"date\")");
        equal(hash.count(), 2, "count");
        equal(hash.find("zero"), 0);
        deepEqual(hash.find("date"), new Date(2013, 1, 1));
    });
    
    test('remove', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(2);
        hash.remove("zero");
        equal(hash.count(), 2, "remove(0)");
        hash.remove("zero");
        equal(hash.count(), 2, "remove(0)");
    });
    
    test('update', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });

        expect(3);
        hash.update("empty", 3);
        equal(hash.count(), 3, "update empty");
        equal(hash.find("empty"), 3, "find(\"empty\")");
        equal(hash.count(), 3);
    });

    test('clear', function () {
        var hash = $.hash({
            "zero": 0,
            "empty": "",
            "date": new Date(2013, 1, 1)
        });
        expect(2);
        equal(hash.count(), 3, "clear()");
        equal(hash.clear().count(), 0, "clear()");
    });
});