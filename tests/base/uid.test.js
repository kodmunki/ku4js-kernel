$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    test('uid', function (test) {
        expect(2);
        ok(/uid\d+/.test($.kuid()));
        ok(/myID\d+/.test($.kuid("myID")));
    });
});