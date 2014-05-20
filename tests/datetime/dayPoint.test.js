$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    var date = $.dayPoint(2011, 1, 1);

    module("dayPoint");

    test('create', function () {
        expect(16);
        ok(!$.dayPoint(null));
        ok(!$.dayPoint(undefined));
        ok($.dayPoint(2011, 1, 1));
        ok($.dayPoint.parse("01/01/2011"));
        ok($.dayPoint.parse(new Date("1/1/2011")));
        ok($.dayPoint(2011, 1, 1).isTypeOf($.dayPoint.Class));
        equal(date.day(), 6);
        equal(date.date(), 1);
        equal(date.month(), 1);
        equal(date.year(), 2011);
        equal(date.hour(), "00");
        equal(date.minute(), "00");
        equal(date.second(), "00");
        equal(date.millisecond(), "00");
        equal(date.isWeekday(), false);
        equal(date.isWeekend(), true);
    });
    test('shortYear', function() {
        expect();
        equal($.dayPoint(2011, 1, 1).shortYear(), 11);
        equal($.dayPoint(21011, 1, 1).shortYear(), 11);
        equal($.dayPoint(2014, 1, 1).shortYear(), 14);
        equal($.dayPoint(1, 1, 1).shortYear(), 1);
    }),
    test('toString', function () {
        expect(7);
        throws(function(){$.dayPoint(null).toString()});
        throws(function(){$.dayPoint(undefined).toString()});
        equal($.dayPoint(2011, 1, 1).toString(), "01/01/2011");
        throws(function(){$.dayPoint.parse(null).toString()});
        throws(function(){$.dayPoint.parse(undefined).toString()});
        equal($.dayPoint.parse("1/1/2011").toString(), "01/01/2011");
        equal($.dayPoint.parse(new Date("1/1/2011")).toString(), "01/01/2011");
    });
    test('toStringWithFormat', function () {
        expect(12);
        throws(function(){$.dayPoint(null).toStringWithFormat()});
        throws(function(){$.dayPoint(undefined).toStringWithFormat()});

        equal($.dayPoint(2011, 2, 1).toStringWithFormat("mm/dd/yy"), "02/01/11");
        equal($.dayPoint(2011, 2, 1).toStringWithFormat("mm/dd/yyyy"), "02/01/2011");
        equal($.dayPoint(2011, 2, 1).toStringWithFormat("dd/mm/yyyy"), "01/02/2011");
        equal($.dayPoint(2011, 2, 1).toStringWithFormat("yy/mm/dd"), "11/02/01");

        equal($.dayPoint(2011, 12, 31).toStringWithFormat("mm/dd/yy"), "12/31/11");
        equal($.dayPoint(2011, 12, 31).toStringWithFormat("mm/dd/yyyy"), "12/31/2011");
        equal($.dayPoint(2011, 12, 31).toStringWithFormat("dd/mm/yyyy"), "31/12/2011");
        equal($.dayPoint(2011, 12, 31).toStringWithFormat("yy/mm/dd"), "11/12/31");

        equal($.dayPoint(2011, 12, 31).toStringWithFormat("mm-dd-yyyy"), "12-31-2011");
        equal($.dayPoint(2011, 12, 31).toStringWithFormat("mm.dd.yyyy--yyyy--m"), "12.31.2011--2011--12");
    });
    test('toDate', function () {
        expect(8);
        throws(function(){$.dayPoint(null).toDate()});
        throws(function(){$.dayPoint(undefined).toDate()});
        equal($.dayPoint(2011, 1, 1).toDate().toString(), new Date("01/01/2011").toString());
        throws(function(){$.dayPoint.parse(null).toDate()});
        throws(function(){$.dayPoint.parse(null).toDate()});
        throws(function(){$.dayPoint.parse(undefined).toDate()});
        equal($.dayPoint.parse("1/1/2011").toDate().toString(), new Date("01/01/2011").toString());
        equal($.dayPoint.parse(new Date("1/1/2011")).toDate().toString(), new Date("01/01/2011").toString());
    });
    test('toJson', function () {
        expect(8);
        throws(function(){$.dayPoint(null).toJson()});
        throws(function(){$.dayPoint(undefined).toJson()});
        equal($.dayPoint(2011, 1, 1).toJson(), new Date("01/01/2011").toJSON());
        throws(function(){$.dayPoint.parse(null).toJson()});
        throws(function(){$.dayPoint.parse(null).toJson()});
        throws(function(){$.dayPoint.parse(undefined).toJson()});
        equal($.dayPoint.parse("1/1/2011").toJson(), new Date("01/01/2011").toJSON());
        equal($.dayPoint.parse(new Date("1/1/2011")).toJson(), new Date("01/01/2011").toJSON());
    });
    test('navigation', function () {
        expect(15);
        ok(date.equals($.dayPoint.parse("1/1/2011")));
        ok(date.nextDay().equals($.dayPoint.parse("1/2/2011")));
        ok(date.prevDay().equals($.dayPoint.parse("12/31/2010")));
        ok(date.nextMonth().equals($.dayPoint.parse("2/1/2011")));
        ok(date.prevMonth().equals($.dayPoint.parse("12/1/2010")));
        ok(date.nextYear().equals($.dayPoint.parse("1/1/2012")));
        ok(date.prevYear().equals($.dayPoint.parse("1/1/2010")));
        ok(date.firstDayOfMonth().equals($.dayPoint.parse("1/1/2011")));
        ok(date.lastDayOfMonth().equals($.dayPoint.parse("1/31/2011")));
        ok(date.isAfter($.dayPoint.parse("12/31/2010")));
        ok(!date.isBefore($.dayPoint.parse("12/31/2010")));
        ok(!date.isAfter($.dayPoint.parse("2/1/2011")));
        ok(date.isBefore($.dayPoint.parse("2/1/2011")));
        ok(date.isBefore($.dayPoint.parse("2/1/2011")));
        ok(date.isBefore($.dayPoint.parse("2/1/2011")));
    });
    test('canParse', function () {
        expect(10);
        ok($.dayPoint.canParse("1/1/2011"));
        ok($.dayPoint.canParse(new Date("1/1/2011")));
        ok($.dayPoint.canParse(1));
        ok(!$.dayPoint.canParse(null));
        ok(!$.dayPoint.canParse(undefined));
        ok(!$.dayPoint.canParse(""));
        ok(!$.dayPoint.canParse("A"));
        ok(!$.dayPoint.canParse([]));
        ok(!$.dayPoint.canParse({}));
        ok(!$.dayPoint.canParse(function() { }));
    });
    test('parse', function () {
        expect(10);
        ok($.dayPoint.parse("1/1/2011"));
        ok($.dayPoint.parse(new Date("1/1/2011")));
        ok($.dayPoint.parse(1));
        ok(!$.dayPoint.parse(null));
        ok(!$.dayPoint.parse(undefined));
        ok(!$.dayPoint.parse(""));
        ok(!$.dayPoint.parse("A"));
        ok(!$.dayPoint.parse([]));
        ok(!$.dayPoint.parse({}));
        ok(!$.dayPoint.parse(function() { }));
    });
    test('today', function () {
        expect(1);
        ok($.dayPoint.today());

    });
    test('now', function () {
        expect(4);
        ok($.dayPoint.today().equals($.dayPoint.parse(new Date())));
        $.dayPoint.assumeNow($.dayPoint.parse("1/1/2011"));
        ok($.dayPoint.today().equals($.dayPoint.parse(new Date("1/1/2011"))));
        $.dayPoint.assumeNow(new Date("2/2/2011"));
        ok($.dayPoint.today().equals($.dayPoint.parse(new Date("2/2/2011"))));
        $.dayPoint.assumeNow("3/3/2011");
        ok($.dayPoint.today().equals($.dayPoint.parse(new Date("3/3/2011"))));
    });
});