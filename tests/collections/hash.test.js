$(function(){
    function notOk(s, m) {equal(!!s,false,m);}
    
    var hash = $.hash();

    module("hash");

    test('create', function (test) {
        expect(1);
        ok($.hash());
    });
    
    test('add', function (test) {
        expect(5);
        ok(hash.isEmpty());
        hash.add("one", 1);
        equal(1, hash.count(), "add(\"one\",1)");
        hash.add("two", 2);
        equal(2, hash.count(), "add(\"two\",2)");
        hash.add("two", 3);
        equal(2, hash.count(), "add duplicate");
        equal(2, hash.find("two"), "find(\"two\")");
    });
    
    test('meld', function (test) {
        expect(2);
        hash.meld($.hash({"three":3}));
        equal(hash.count(), 3,  "meld");
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
        ok(hash.containsKey("one"), "containsKey(\"one\")");
    });
    
    test('remove', function (test) {
        expect(1);
        hash.remove("one");
        equal(2, hash.count(), "remove()");
    });
    
    test('update', function (test) {
        expect(3);
        hash.update("two", 3);
        equal(2, hash.count(), "update two");
        equal(3, hash.find("two"), "find(\"two\")");
        equal(2, hash.count());
    });
    
    test('clear', function (test) {
        expect(1);
        hash.clear();
        equal(0, hash.count(), "clear()");
    });
});