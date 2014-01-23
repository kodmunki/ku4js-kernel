$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("mediator");

    test('create', function (test) {
        expect(1);
        ok($.mediator());
    });

    test('subscribe', function (test) {
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

        mediator.notify(3);

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, 3);
    });


    test('unsubscribe', function (test) {
        var test1, test2, test3,
            mediator = $.mediator()
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1"),

            keys = mediator.activeSubscriptionKeys();

        mediator.unsubscribe("method.a", "2");

        expect(7);
        ok(!mediator.isEmpty());
        equal(mediator.count(), 2);
        equal(keys[0], "method.a");
        equal(keys[1], "method.b");

        mediator.notify(3);

        equal(test1, 3);
        equal(test2, undefined);
        equal(test3, 3);
    });

    test('clear', function (test) {
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

        mediator.notify(3);

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

        mediator.notify(3);

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, 3);
    });

    test('filteredNofiy', function (test) {
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

        mediator.notify(3, "method.a");

        equal(test1, 3);
        equal(test2, 3);
        equal(test3, undefined);
    });
});
