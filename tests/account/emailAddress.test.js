$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("emailAddress");

    var emailAddress1 = $.emailAddress("john.doe", "kodmunki", "com"),
        emailAddress2 = $.emailAddress("john.doe", "KODMUNKI", "COM"),
        emailAddress3 = $.emailAddress("john.doe", "sales.kodmunki", "com"),
        emailAddress4 = $.emailAddress("john.Doe", "kodmunki", "com");

    test('create', function () {
        expect(4);
        ok(emailAddress3);
        equal(emailAddress3.local(), "john.doe");
        equal(emailAddress3.domain(), "sales.kodmunki");
        equal(emailAddress3.topLevelDomain(), "com");
    });

    test('equals', function () {
        expect(3);
        ok(emailAddress1.equals(emailAddress2));
        ok(!emailAddress1.equals(emailAddress3));
        ok(!emailAddress1.equals(emailAddress4));
    });

    test('toString', function () {
        expect(2);
        equal(emailAddress1.toString(), "john.doe@kodmunki.com");
        equal(emailAddress3.toString(), "john.doe@sales.kodmunki.com");
    });

    test('parse', function () {
        var emailAddress = $.emailAddress.parse("my.new.email@my.new_company.com");
        expect(3);
        equal(emailAddress.local(), "my.new.email");
        equal(emailAddress.domain(), "my.new_company");
        equal(emailAddress.topLevelDomain(), "com");
    });
});