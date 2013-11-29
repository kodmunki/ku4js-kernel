$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var list =$.list();

    module("list");

    test('create', function (test) {
        expect(1);
        ok($.list());
    });

    var list = $.list();
    
    test('add', function (test) {
        expect(1);
        list.add(null)
            .add(undefined)
            .add(0)
            .add("")
            .add(new Date(2013, 1, 1));
        equal(list.count(), 5, "add");
    });
    
    test('contains', function (test) {
        expect(5);
        ok(list.contains(null));
        ok(list.contains(undefined));
        ok(list.contains(0));
        ok(list.contains(""));
        ok(list.contains(new Date(2013, 1, 1)));
    });
    
    test('find', function (test) {
        expect(5);
        equal(list.find(0), null);
        equal(list.find(1),undefined );
        equal(list.find(2), 0);
        equal(list.find(3), "");
        deepEqual(list.find(4), new Date(2013, 1, 1));
    });
    
    test('remove', function (test) {
        expect(1);
        list.remove(null)
            .remove(undefined)
            .remove(0)
            .remove("")
            .remove(new Date(2013, 1, 1));
        equal(list.count(), 0, "remove");
    });
    
    test('toArray', function (test) {
        expect(2);
        list.add(null)
            .add(undefined)
            .add(0)
            .add("")
            .add(new Date(2013, 1, 1));
        var array = list.toArray();
        ok($.isArray(array));
        equal(array.length, 5);
    });
    
    test('clear', function (test) {
        expect(1);
        list.clear();
        equal(list.count(), 0, "clear");
    });
    
    test('isEmpty', function (test) {
        expect(1);
        ok(list.isEmpty(), "isEmpty");
    });
});