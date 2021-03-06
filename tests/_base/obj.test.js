$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var obj1 = {"one":1, "two":2, "three":3 },
        obj2 = {"three":7, "four":4, "five":5, "six":6 };

    module("obj");

    test('keys', function () {
        var keys = $.obj.keys(obj1),
            testValues = ["one", "two", "three"],
            i = 0, l = testValues.length;

        while(i < l) {
            equal(keys[i], testValues[i]);
            i++;
        }
    });

    test('values', function () {
        var values = $.obj.values(obj1),
            testValues = [1, 2, 3],
            i = 0, l = testValues.length;

        while(i < l) {
            equal(values[i], testValues[i]);
            i++;
        }
    });

    test('values', function () {
        var values = $.obj.values(obj1),
            testValues = [1, 2, 3],
            i = 0, l = testValues.length;

        while(i < l) {
            equal(values[i], testValues[i]);
            i++;
        }
    });

    test('count', function () {
        expect(2);
        equal($.obj.count(obj1), 3);
        equal($.obj.count(obj2), 4);
    });

    test('hasProp', function () {
        expect(4);
        ok($.obj.hasProp(obj1, "one"));
        ok($.obj.hasProp(obj1, "two"));
        ok($.obj.hasProp(obj1, "three"));
        ok(!$.obj.hasProp(obj1, "four"));
    });

    test('merge', function () {
        var merge = $.obj.merge(obj1, obj2);
        expect(6);
        equal($.obj.count(merge), 6);
        equal($.obj.count(obj1), 3);
        equal($.obj.count(obj2), 4);
        equal(merge.one, obj1.one);
        equal(merge.six, obj2.six);
        equal(merge.three, obj1.three);
    });

    test('meld', function () {
        var meld = $.obj.meld(obj1, obj2);
        expect(6);
        equal($.obj.count(meld), 6);
        equal($.obj.count(obj1), 3);
        equal($.obj.count(obj2), 4);
        equal(meld.one, obj1.one);
        equal(meld.six, obj2.six);
        equal(meld.three, obj2.three);
    });

    test('filter', function () {
        var filter = $.obj.filter({a:1, b:2, c:3, d:null}, "a", "c", "d");
        expect(4);
        equal(filter.a, 1);
        equal(filter.b, undefined);
        equal(filter.c, 3);
        equal(filter.d, undefined);
    });

    test('areEqual', function() {
        var obj1 = {},
            obj2 = {"a": 1, "b": 2, "c": 3},
            obj3 = {"a": 1, "b": 2, "c": 3},
            obj4 = {"a": 1, "b": 2, "c": 3, "d": 4};

        expect(8);
        ok(!$.obj.areEqual(null, obj2));
        ok(!$.obj.areEqual(obj1, null));
        ok(!$.obj.areEqual(obj1, obj2));
        ok(!$.obj.areEqual(obj1, obj3));
        ok(!$.obj.areEqual(obj1, obj4));
        ok(!$.obj.areEqual(obj2, obj1));
        ok($.obj.areEqual(obj2, obj3));
        ok(!$.obj.areEqual(obj2, obj4));
    });
});