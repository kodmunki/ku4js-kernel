$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var array = [1,2,3],
        date = new Date(),
        obj = {"1":1,"2":2,"3":3};

    module("replicate");

    test('replicate', function (test) {
        expect(5);
        ok($.replicate(null) ==  null);
        ok($.replicate(undefined) == undefined);
        ok(array[0] == $.replicate(array)[0]);
        ok(date.valueof == $.replicate(date).valueof);
        ok(obj["1"] == $.replicate(obj)["1"]);
    });
});
