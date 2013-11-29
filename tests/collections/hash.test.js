$(function(){
    function notOk(s, m) {equal(!!s,false,m);}
    
    var hash = $.hash();

    module("hash");

    test('create', function (test) {
        expect(1);
        ok($.hash());
    });
    
    test('add', function (test) {
        expect(10);
        ok(hash.isEmpty());

        raises(function() { hash.add(null, 0) }, "Invalid key: null");
        raises(function() { hash.add(undefined, 0) }, "Invalid key: undefined");

        hash.add("null", null);
        equal(hash.count(), 1, "add(\"null\", null)");
        hash.add("undefined", undefined);
        equal(hash.count(), 2, "add(\"undefined\", undefined)");
        hash.add("zero", 0);
        equal(hash.count(), 3, "add(\"zero\", 0)");
        hash.add("empty", "");
        equal(hash.count(), 4, "add(\"empty\", \"\")");
        hash.add("date", new Date(2013, 1, 1));
        equal(hash.count(), 5, "add(\"date\",new Date(2013, 1, 1))");
    
        raises(function() { hash.add("empty", 3); }, "Invalid key: duplicate");
        equal(hash.count(), 5, "Invalid key: duplicate");
    });
    
    test('meld', function (test) {
        expect(2);
        hash.meld($.hash({"three":3}));
        equal(hash.count(), 6,  "meld");
        hash.meld({"three":4});
        equal(hash.findValue("three"), 3, "meld duplicate");
    });
    
    test('merge', function (test) {
        expect(2);
        hash.merge({"three":4});
        equal(4, hash.findValue("three"), "merge duplicate");
        hash.merge($.hash({"three":5}));
        equal(5, hash.findValue("three"), "merge duplicate");
    });
    
    test('containsKey', function (test) {
        expect(1);
        ok(hash.containsKey("zero"), "containsKey(\"zero\")");
    });
    
    test('containsValue', function (test) {
        expect(5);
        ok(hash.containsValue(null), "containsValue(null)");
        ok(hash.containsValue(undefined), "containsValue(undefined)");
        ok(hash.containsValue(0), "containsValue(0)");
        ok(hash.containsValue(""), "containsValue(\"\")");
        ok(hash.containsValue(new Date(2013, 1, 1)), "containsValue(new Date(2013, 1, 1))");
    });
    
    test('remove', function (test) {
        expect(3);
        hash.remove("null");
        equal(hash.count(), 5, "remove(null)");
        hash.remove("undefined");
        equal(hash.count(), 4, "remove(undefined)");
        hash.remove("zero");
        equal(hash.count(), 3, "remove(0)");
    });
    
    test('update', function (test) {
        expect(3);
        hash.update("empty", 3);
        equal(hash.count(), 3, "update empty");
        equal(hash.find("empty"), 3, "find(\"empty\")");
        equal(hash.count(), 3);
    });

    test('clear', function (test) {
        expect(1);
        hash.clear();
        equal(0, hash.count(), "clear()");
    });
});