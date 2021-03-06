$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("mediator");

    test('create', function () {
        expect(1);
        ok($.mediator());
    });

    test('subscribe', function () {
        var test1, test2, test3,
            mediator = $.mediator()
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1"),

            keys = mediator.activeSubscriptionKeys();

        expect(7);
        ok(!mediator.isEmpty());
        equal(mediator.count(), 2);
        equal(keys[0], "method.a");
        equal(keys[1], "method.b");

        mediator.notify("", 3);

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, 3);
    });


    test('unsubscribe', function () {
        var test1, test2, test3, test4, test5, test6,
            mediator = $.mediator()
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.a", function(value){ test3 = value; }, null, "3")
            .subscribe("method.b", function(value){ test4 = value; }, null, "1")
            .subscribe("method.b", function(value){ test5 = value; }, null, "2")
            .subscribe("method.c", function(value){ test6 = value; }, null, "1"),

            keys = mediator.activeSubscriptionKeys();

        mediator.unsubscribe("method.a", "2");

        expect(23);
        ok(!mediator.isEmpty());
        equal(mediator.count(), 3);
        equal(keys[0], "method.a");
        equal(keys[1], "method.b");
        equal(keys[2], "method.c");

        mediator.notify("", 3);

        equal(test1, 3);
        equal(test2, undefined);
        equal(test3, 3);
        equal(test4, 3);
        equal(test5, 3);
        equal(test6, 3);

        mediator.unsubscribe("method.a");

        mediator.notify("", 4);

        equal(test1, 3);
        equal(test2, undefined);
        equal(test3, 3);
        equal(test4, 4);
        equal(test5, 4);
        equal(test6, 4);

        mediator.unsubscribe("", 1);

        mediator.notify("", 5);

        equal(test1, 3);
        equal(test2, undefined);
        equal(test3, 3);
        equal(test4, 4);
        equal(test5, 5);
        equal(test6, 4);
    });

    test('clear', function () {
        var test1, test2, test3,
            mediator = $.mediator()
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1")
            .clear(),

            keys = mediator.activeSubscriptionKeys();

        expect(13);
        ok(mediator.isEmpty());
        equal(mediator.count(), 0);
        deepEqual(keys, []);

        mediator.notify("", 3);

        equal(test1, undefined);
        equal(test2, undefined);
        equal(test3, undefined);

        mediator
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1"),

            keys = mediator.activeSubscriptionKeys();

        ok(!mediator.isEmpty());
        equal(mediator.count(), 2);
        equal(keys[0], "method.a");
        equal(keys[1], "method.b");

        mediator.notify("", 3);

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, 3);
    });

    test('filteredNofiy', function () {
        var test1, test2, test3,
            mediator = $.mediator()
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1"),

            keys = mediator.activeSubscriptionKeys();

        expect(7);
        ok(!mediator.isEmpty());
        equal(mediator.count(), 2);
        equal(keys[0], "method.a");
        equal(keys[1], "method.b");

        mediator.notify("method.a", 3);

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, undefined);
    });
});
