$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var list =$.list();

    module("list");

    test('create', function (test) {
        expect(2);
        ok($.list());
        ok($.list().isTypeOf($.list.Class));
    });
    
    test('add', function (test) {
        var list = $.list();

        expect(1);
        list.add(null)
            .add(0)
            .add("")
            .add(new Date(2013, 1, 1));
        equal(list.count(), 4, "add");
    });
    
    test('contains', function (test) {
        var list = $.list([null, 0, "", new Date(2013, 1, 1)]);

        expect(4);
        ok(list.contains(null));
        ok(list.contains(0));
        ok(list.contains(""));
        ok(list.contains(new Date(2013, 1, 1)));
    });
    
    test('find', function (test) {
        var list = $.list([null, 0, "", new Date(2013, 1, 1)]);

        expect(4);
        equal(list.find(0), null);
        equal(list.find(1), 0);
        equal(list.find(2), "");
        deepEqual(list.find(3), new Date(2013, 1, 1));
    });
    
    test('remove', function (test) {
        var list = $.list([null, 0, "", new Date(2013, 1, 1)]);

        expect(1);
        list.remove(null)
            .remove(0)
            .remove("")
            .remove(new Date(2013, 1, 1));

        equal(list.count(), 0, "remove");
    });
    
    test('toArray', function (test) {
        var list = $.list([null, undefined, 0, "", new Date(2013, 1, 1)]);

        expect(2);
        list.add(null)
            .add(0)
            .add("")
            .add(new Date(2013, 1, 1));
        var array = list.toArray();
        ok($.isArray(array));
        equal(array.length, 8);
    });
    
    test('clear', function (test) {
        var list = $.list([null, 0, "", new Date(2013, 1, 1)]);

        expect(1);
        list.clear();
        equal(list.count(), 0, "clear");
    });
    
    test('isEmpty', function (test) {
        var list = $.list([null, 0, "", new Date(2013, 1, 1)]);

        expect(2);
        ok(!list.isEmpty(), "isEmpty");
        ok(list.clear().isEmpty(), "isEmpty");
    });
});