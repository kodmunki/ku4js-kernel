$(function() {
    function notOk(s, m) {
        equal(!!s, false, m);
    }

    var arr = ["one", "two", "three"];

    module("arr");

    test('indexOfRegExp', function () {
        expect(4);
        equal($.arr.indexOfRegExp(arr, /one/), 0);
        equal($.arr.indexOfRegExp(arr, /on/), 0);
        equal($.arr.indexOfRegExp(arr, /t/), 1);
        equal($.arr.indexOfRegExp(arr, /ree/), 2);
    });
});