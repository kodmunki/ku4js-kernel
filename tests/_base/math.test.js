$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("math");
    
    test('methods round', function (test) {
        expect(10);
        equal($.math.round(0), 0);
        equal($.math.round(555.555, -4), 555.555, "-4");
        equal($.math.round(555.555, -3), 555.555, "-3");
        equal($.math.round(555.555, -2), 555.56, "-2");
        equal($.math.round(555.555, -1), 555.6, "-1");
        equal($.math.round(555.555, 0), 556, "0");
        equal($.math.round(555.555, 1), 560, "1");
        equal($.math.round(555.555, 2), 600, "2");
        equal($.math.round(555.555, 3), 1000, "3");
        equal($.math.round(555.555, 4), 0, "4");
    });
    
    test('methods roundUp', function (test) {
        expect(10);
        equal($.math.roundUp(0), 1);
        equal($.math.roundUp(555.554, -4), 555.5541, "-4");
        equal($.math.roundUp(555.554, -3), 555.555, "-3");
        equal($.math.roundUp(555.554, -2), 555.56, "-2");
        equal($.math.roundUp(555.554, -1), 555.6, "-1");
        equal($.math.roundUp(555.554, 0), 556, "0");
        equal($.math.roundUp(555.554, 1), 560, "1");
        equal($.math.roundUp(555.554, 2), 600, "2");
        equal($.math.roundUp(555.554, 3), 1000, "3");
        equal($.math.roundUp(555.554, 4), 10000, "4");
    });
    
    test('methods roundDown', function (test) {
        expect(10);
        equal($.math.roundUp(0), 1);
        equal($.math.roundUp(555.554, -4), 555.5541, "-4");
        equal($.math.roundUp(555.554, -3), 555.555, "-3");
        equal($.math.roundUp(555.554, -2), 555.56, "-2");
        equal($.math.roundUp(555.554, -1), 555.6, "-1");
        equal($.math.roundUp(555.554, 0), 556, "0");
        equal($.math.roundUp(555.554, 1), 560, "1");
        equal($.math.roundUp(555.554, 2), 600, "2");
        equal($.math.roundUp(555.554, 3), 1000, "3");
        equal($.math.roundUp(555.554, 4), 10000, "4");
    });
});