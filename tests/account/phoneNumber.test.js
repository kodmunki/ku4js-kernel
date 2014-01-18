$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("phoneNumber");

    test('create', function () {
        var phoneNumber = $.phoneNumber(223344)
        expect(2);
        ok(phoneNumber);
        ok(phoneNumber.isTypeOf($.phoneNumber.Class));
    });

    test('value', function () {
        var phoneNumber = $.phoneNumber(223344)
        expect(1);
        equal(phoneNumber.value(), 223344);
    });

    test('equals', function () {
        var phoneNumber1 = $.phoneNumber(223344),
            phoneNumber2 = $.phoneNumber(223344),
            phoneNumber3 = $.phoneNumber(556677)
        expect(2);
        ok(phoneNumber1.equals(phoneNumber2));
        ok(!phoneNumber1.equals(phoneNumber3));
    });

    test('toStringWithFormat', function () {
        var phoneNumber = $.phoneNumber(2223334444)
        expect(2);
        ok(phoneNumber.toStringWithFormat("(###) ###-####"), "(222) 333-4444");
        ok(phoneNumber.toStringWithFormat("(##) ##-###"), "(22) 23-3344");
    });

    test('parse', function () {
        var phoneNumber = $.phoneNumber.parse("(222) 333-4444");
        expect(1);
        equal(phoneNumber.value(), 2223334444);
    });
});