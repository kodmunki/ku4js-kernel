$(function(){
    function notOk(s, m) {equal(s,false,m);}

    var mediator = $.mediator().throwErrors(),
        test1, test2, test3;

    module("mediator");

    test('create', function (test) {
        expect(1);
        ok($.mediator());
    });

    test('methods', function (test) {
        expect(14);
        mediator
            .subscribe("method.a", function(value){ test1 = value; }, null, "1")
            .subscribe("method.a", function(value){ test2 = value; }, null, "2")
            .subscribe("method.b", function(value){ test3 = value; }, null, "1");

        raises(function(){ mediator.notify("0", "method.c")}, "");

        mediator.notify(null, "method.a");
        equal(test1, null);

        mediator.notify(null, "method.a");
        equal(test1, undefined);

        mediator.notify("", "method.a");
        equal(test1, "");

        mediator.notify("value1");

        equal(test1, "value1");
        equal(test2, "value1");
        equal(test3, "value1");

        mediator.notify("value2", "method.b");

        equal(test1, "value1");
        equal(test2, "value1");
        equal(test3, "value2");

        //unsubscribe
        mediator.unsubscribe("method.a", "2");
        mediator.notify("value3");

        equal(test1, "value3");
        equal(test2, "value1");
        equal(test3, "value3");

        //clear
        ok(mediator.clear().isEmpty());
    });
});