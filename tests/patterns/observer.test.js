$(function(){
    function notOk(s, m) {equal(s,false,m);}

    var  observer = $.observer(), test1, test2;

exports['create'] = function (test) {
    test.expect(1);
    test.ok($observer());
    test.done();
};

exports['add'] = function (test) {
    test.expect(4);
    test.ok($.isUndefined(test1));
    test.ok($.isUndefined(test2));

    observer.add(function(){test1 = 1; }, this, "1");
    observer.add(function(){test2 = 2; }, this, "2");
    observer.notify();

    test.equal(1, test1);
    test.equal(2, test2);
    test.done();
};

exports['remove'] = function (test) {
    test.expect(5);

    test1 = undefined;
    test2 = undefined;

    test.ok($.isUndefined(test1));
    test.ok($.isUndefined(test2));

    observer.remove("1");
    observer.remove("2");
    observer.notify();

    test.equal(undefined, test1);
    test.equal(undefined, test2);

    test.ok(observer.isEmpty());
    test.done();
};