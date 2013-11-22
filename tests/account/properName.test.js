$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("properName");

    test('create', function (test) {
        var properName = $.properName("John", "David", "Doe")
        expect(4);
        ok(properName);
        equal(properName.first(), "John");
        equal(properName.middle(), "David");
        equal(properName.last(), "Doe");
    });

    test('equals', function (test) {
        var properName1 = $.properName("John", "David", "Doe"),
            properName2 = $.properName("John", "David", "Doe"),
            properName3 = $.properName("John", "Dave", "Doe")
        expect(2);
        ok(properName1.equals(properName2));
        ok(!properName1.equals(properName3))
    });

    test('full', function (test) {
        var properName1 = $.properName("John", "David", "Doe"),
            properName2 = $.properName("John", null, "Doe");
        expect(2);
        equal(properName1.full(), "John David Doe");
        equal(properName2.full(), "John Doe");
    });

    test('initials', function (test) {
        var properName1 = $.properName("John", "David", "Doe"),
            properName2 = $.properName("John", null, "Doe");

        expect(2);
        equal(properName1.initials(), "J.D.D.");
        equal(properName2.initials(), "J.D.");
    });

    test('toStringWithFormat', function (test) {
        var properName1 = $.properName("John", "David", "Doe"),
            properName2 = $.properName("John", null, "Doe");

        expect(4);
        equal(properName1.toStringWithFormat("{F} {m}. {L}"), "John D. Doe");
        equal(properName2.toStringWithFormat("{F} {m}. {L}"), "John . Doe");
        equal(properName1.toStringWithFormat("{L} {F}, {m}."), "Doe John, D.");
        equal(properName2.toStringWithFormat("{L} {F}, {m}."), "Doe John, .");
    });
});