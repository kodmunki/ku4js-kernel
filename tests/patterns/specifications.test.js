$(function(){
    function notOk(s, m) {equal(s,false,m);}
    
    var True = $.spec(function(v){return v == true;}),
        False = $.spec(function(v){return v == false;});

    module("specifications");

    test('create', function () {
        var lock1 = $.spec(),
            lock2 = $.spec(false),
            lock3 = $.spec(true);

        expect(1);
        ok($.spec(function(v){return v == true;}));
    });

    test('and', function () {
        expect(8);
        ok(True.and(True).isSatisfiedBy(true));
        ok(!True.and(True).isSatisfiedBy(false));
        ok(!False.and(False).isSatisfiedBy(true));
        ok(False.and(False).isSatisfiedBy(false));
        ok(!True.and(False).isSatisfiedBy(true));
        ok(!True.and(False).isSatisfiedBy(false));
        ok(!False.and(True).isSatisfiedBy(true));
        ok(!False.and(True).isSatisfiedBy(false));
    });

    test('or', function () {
        expect(8);
        ok(True.or(True).isSatisfiedBy(true));
        ok(!True.or(True).isSatisfiedBy(false));
        ok(!False.or(False).isSatisfiedBy(true));
        ok(False.or(False).isSatisfiedBy(false));
        ok(True.or(False).isSatisfiedBy(true));
        ok(True.or(False).isSatisfiedBy(false));
        ok(False.or(True).isSatisfiedBy(true));
        ok(False.or(True).isSatisfiedBy(false));
    });

    test('xor', function () {
        expect(8);
        ok(!True.xor(True).isSatisfiedBy(true));
        ok(!True.xor(True).isSatisfiedBy(false));
        ok(!False.xor(False).isSatisfiedBy(true));
        ok(!False.xor(False).isSatisfiedBy(false));
        ok(True.xor(False).isSatisfiedBy(true));
        ok(True.xor(False).isSatisfiedBy(false));
        ok(False.xor(True).isSatisfiedBy(true));
        ok(False.xor(True).isSatisfiedBy(false));
    });

    test('not', function () {
        expect(4);
        ok(!True.not().isSatisfiedBy(true));
        ok(True.not().isSatisfiedBy(false));
        ok(False.not().isSatisfiedBy(true));
        ok(!False.not().isSatisfiedBy(false));
    });
});