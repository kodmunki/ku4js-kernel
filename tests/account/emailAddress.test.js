$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("emailAddress");

    var emailAddress1 = $.emailAddress("john.doe", "kodmunki", "com"),
        emailAddress2 = $.emailAddress("john.doe", "kodmunki", "com"),
        emailAddress3 = $.emailAddress("john.doe", "sales.kodmunki", "com");

    test('create', function (test) {
        expect(5);
        ok(emailAddress3);
        ok(emailAddress3.isTypeOf($.emailAddress.Class));
        equal(emailAddress3.username(), "john.doe");
        equal(emailAddress3.domain(), "sales.kodmunki");
        equal(emailAddress3.topLevelDomain(), "com");
    });

    test('equals', function (test) {
        expect(2);
        ok(emailAddress1.equals(emailAddress2));
        ok(!emailAddress1.equals(emailAddress3))
    });

    test('toString', function (test) {
        expect(2);
        equal(emailAddress1.toString(), "john.doe@kodmunki.com");
        equal(emailAddress3.toString(), "john.doe@sales.kodmunki.com");
    });

    test('parse', function (test) {
        var emailAddress = $.emailAddress.parse("my.new.email@my.new_company.com")
        expect(3);
        equal(emailAddress.username(), "my.new.email");
        equal(emailAddress.domain(), "my.new_company");
        equal(emailAddress.topLevelDomain(), "com");
    });
});