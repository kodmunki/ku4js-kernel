$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("uid");

    test('uid', function () {
        expect(2);
        equal($.uid().length, 32);
        ok(/[^=]/.test($.uid()));
    });
});