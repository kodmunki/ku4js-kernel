$(function(){
    function notOk(s, m) {equal(s,false,m);}

    var rectangle1 = $.rectangle($.coord.zero(), $.coord(6,5)),
        rectangle2 = $.rectangle($.coord(5,5), $.coord(10,10));

    module("rectangle");

    test('create', function () {
        expect(2);
        ok($.rectangle($.coord.zero(), $.coord(6,5)));
        ok($.rectangle($.coord.zero(), $.coord(6,5)).isTypeOf($.rectangle.Class));
    });
    test('topLeft', function () {
        expect(2);
        ok(rectangle1.topLeft().equals($.coord.zero()));
        ok(rectangle2.topLeft().equals($.coord(5,5)));
    });
    test('bottomRight', function () {
        expect(2);
        ok(rectangle1.bottomRight().equals($.coord(6,5)));
        ok(rectangle2.bottomRight().equals($.coord(15,15)));
    });
    test('bottomRight', function () {
        expect(2);
        ok(rectangle1.center().equals($.coord(3,2.5)));
        ok(rectangle2.center().equals($.coord(7.5,7.5)));
    });
    test('contains', function () {
        expect(14);
        ok(rectangle1.contains($.coord(1,1)));
        ok(rectangle1.contains($.coord(4,4)));
        ok(rectangle1.contains(rectangle1.center()));
        ok(!rectangle1.contains($.coord.zero()));
        ok(!rectangle1.contains($.coord(6,5)));
        ok(!rectangle1.contains($.coord(6,6)));
        ok(!rectangle1.contains($.coord(-1,-1)));
    
        ok(rectangle2.contains($.coord(6,6)));
        ok(rectangle2.contains($.coord(8,8)));
        ok(rectangle2.contains(rectangle2.center()));
        ok(!rectangle2.contains($.coord.zero()));
        ok(!rectangle2.contains($.coord(15,15)));
        ok(!rectangle2.contains($.coord(15,16)));
        ok(!rectangle2.contains($.coord(-1,-1)));
    });
});

