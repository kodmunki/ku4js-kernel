$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("uid");

    test('uid', function (test) {
        expect(2);
        ok(/uid\d+/.test($.uid()));
        ok(/myID\d+/.test($.uid("myID")));
    });
});