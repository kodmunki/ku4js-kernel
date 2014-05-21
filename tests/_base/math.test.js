$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("math");
    
    test('methods round', function () {
        expect(12);
        equal($.math.round(0), 0);
        equal($.math.round(-0.01), 0);
        equal($.math.round(0.01), 0);
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
    
    test('methods roundUp', function () {
        expect(12);
        equal($.math.roundUp(0), 1);
        equal($.math.roundUp(-0.01), 0);
        equal($.math.roundUp(0.01), 1);
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
    
    test('methods roundDown', function () {
        expect(12);
        equal($.math.roundDown(0), 0);
        equal($.math.roundDown(-0.01), -1);
        equal($.math.roundDown(0.01), 0);
        equal($.math.roundDown(555.554, -4), 555.554, "-4");
        equal($.math.roundDown(555.554, -3), 555.554, "-3");
        equal($.math.roundDown(555.554, -2), 555.55, "-2");
        equal($.math.roundDown(555.554, -1), 555.5, "-1");
        equal($.math.roundDown(555.554, 0), 555, "0");
        equal($.math.roundDown(555.554, 1), 550, "1");
        equal($.math.roundDown(555.554, 2), 500, "2");
        equal($.math.roundDown(555.554, 3), 0, "3");
        equal($.math.roundDown(555.554, 4), 0, "4");
    });
});