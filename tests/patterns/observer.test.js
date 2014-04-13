$(function(){
    function notOk(s, m) {equal(s,false,m);}

    var  observer = $.observer(), test1, test2;

    module("observer");

    test('create', function () {
        expect(1);
        ok($.observer());
    });

    test('add', function () {
        expect(4);
        ok($.isUndefined(test1));
        ok($.isUndefined(test2));

        observer.add(function(){test1 = 1; }, this, "1");
        observer.add(function(){test2 = 2; }, this, "2");
        observer.notify();

        equal(1, test1);
        equal(2, test2);
    });

    test('remove', function () {
        expect(5);

        test1 = undefined;
        test2 = undefined;

        ok($.isUndefined(test1));
        ok($.isUndefined(test2));

        observer.remove("1");
        observer.remove("2");
        observer.notify();

        equal(undefined, test1);
        equal(undefined, test2);

        ok(observer.isEmpty());
    });
});