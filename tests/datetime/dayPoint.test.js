$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("dayPoint");

    test('create', function () {
        expect(5);
        ok(!$.dayPoint(null));
        ok(!$.dayPoint(undefined));
        ok($.dayPoint(2011, 1, 1));
        ok($.dayPoint.parse("01/01/2011"));
        ok($.dayPoint.parse(new Date("1/1/2011")));
    });
    test('value', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        deepEqual(dayPoint.value(), new Date(2016, 1, 28));
    });
    test('day', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        equal(dayPoint.day(), 0);
    });
    test('date', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        equal(dayPoint.date(), 28);
    });
    test('month', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        equal(dayPoint.month(), 2);
    });
    test('year', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        equal(dayPoint.year(), 2016);
    });
    test('shortYear', function() {
        expect(2);
        equal($.dayPoint(2011, 1, 1).shortYear(), 11);
        equal($.dayPoint(1, 1, 1).shortYear(), 1);
    });
    test('isWeekday', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(!dayPoint.isWeekday());
    });
    test('isWeekend', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.isWeekend());
    });
    test('isLeapYear', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.isLeapYear());
    });
    test('nextDay', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.nextDay().equals($.dayPoint(2016, 2, 29)));
    });
    test('prevDay', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.prevDay().equals($.dayPoint(2016, 2, 27)));
    });
    test('nextMonth', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.nextMonth().equals($.dayPoint(2016, 3, 28)));
    });
    test('prevMonth', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.prevMonth().equals($.dayPoint(2016, 1, 28)));
    });
    test('nextYear', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.nextYear().equals($.dayPoint(2017, 2, 28)));
    });
    test('prevYear', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.prevYear().equals($.dayPoint(2015, 2, 28)));
    });
    test('add', function() {
        expect(6);
        ok($.dayPoint(2011, 1, 1).add(1, 0, 0).equals($.dayPoint(2012, 1, 1)));
        ok($.dayPoint(2011, 1, 1).add(0, 1, 0).equals($.dayPoint(2011, 2, 1)));
        ok($.dayPoint(2011, 1, 1).add(0, 0, 1).equals($.dayPoint(2011, 1, 2)));
        ok($.dayPoint(2011, 1, 1).add(-1, 0, 0).equals($.dayPoint(2010, 1, 1)));
        ok($.dayPoint(2011, 1, 1).add(0, -1, 0).equals($.dayPoint(2010, 12, 1)));
        ok($.dayPoint(2011, 1, 1).add(0, 0, -1).equals($.dayPoint(2010, 12, 31)));
    });
    test('firstDayOfMonth', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.firstDayOfMonth().equals($.dayPoint(2016, 2, 1)));
    });
    test('lastDayOfMonth', function () {
        expect(1);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.lastDayOfMonth().equals($.dayPoint(2016, 2, 29)));
    });
    test('isBefore', function () {
        expect(4);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(!dayPoint.isBefore($.dayPoint(2016, 2, 28)));
        ok(dayPoint.isBefore($.dayPoint(2017, 2, 28)));
        ok(dayPoint.isBefore($.dayPoint(2016, 3, 28)));
        ok(dayPoint.isBefore($.dayPoint(2016, 2, 29)));
    });
    test('isAfter', function () {
        expect(4);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(!dayPoint.isAfter($.dayPoint(2016, 2, 28)));
        ok(dayPoint.isAfter($.dayPoint(2015, 2, 28)));
        ok(dayPoint.isAfter($.dayPoint(2016, 1, 28)));
        ok(dayPoint.isAfter($.dayPoint(2016, 2, 27)));
    });
    test('equals', function () {
        expect(4);
        var dayPoint = $.dayPoint(2016, 2, 28);
        ok(dayPoint.equals($.dayPoint(2016, 2, 28)));
        ok(!dayPoint.equals($.dayPoint(2017, 2, 28)));
        ok(!dayPoint.equals($.dayPoint(2016, 3, 28)));
        ok(!dayPoint.equals($.dayPoint(2016, 2, 29)));
    });
    test('toString', function () {
        expect(1);
        equal($.dayPoint(2011, 1, 1).toString(), "01/01/2011");
    });
    test('toStringWithFormat', function () {
        expect(10);
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
        expect(1);
        deepEqual($.dayPoint(2011, 1, 1).toDate(), new Date("01/01/2011"));
    });
    test('toJson', function () {
        expect(1);
        equal($.dayPoint(2011, 1, 1).toJson(), new Date("01/01/2011").toJSON());
    });
    test('canParse', function () {
        expect(12);
        ok($.dayPoint.canParse("1/1/2011"));
        ok($.dayPoint.canParse("05/01/2011"));
        ok($.dayPoint.canParse(new Date("1/1/2011")));
        ok($.dayPoint.canParse("1906-08-04T05:00:00.000Z"));
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
        expect(14);
        ok($.dayPoint.parse("1/1/2011"));
        ok($.dayPoint.parse(new Date("1/1/2011")));
        ok($.dayPoint.parse(1));
        ok($.dayPoint.parse("1906-08-04T05:00:00.000Z"));
        ok($.dayPoint.parse('2017-01-16T05:00:00Z').equals($.dayPoint(2017, 1, 16)));
        deepEqual($.dayPoint.parse("2011-08-01").toDate(), new Date("08/01/2011"));
        deepEqual($.dayPoint.parse("1906-08-04T05:00:00.000Z").toDate(), new Date("08/04/1906"));
        raises(function() { $.dayPoint.parse(null); });
        raises(function() { $.dayPoint.parse(undefined); });
        raises(function() { $.dayPoint.parse(""); });
        raises(function() { $.dayPoint.parse("A"); });
        raises(function() { $.dayPoint.parse([]); });
        raises(function() { $.dayPoint.parse({}); });
        raises(function() { $.dayPoint.parse(function() { }); });
    });
    test('tryParse', function () {
        expect(10);
        ok($.dayPoint.tryParse("1/1/2011"));
        ok($.dayPoint.tryParse(new Date("1/1/2011")));
        ok($.dayPoint.tryParse(1));
        ok(!$.dayPoint.tryParse(null));
        ok(!$.dayPoint.tryParse(undefined));
        ok(!$.dayPoint.tryParse(""));
        ok(!$.dayPoint.tryParse("A"));
        ok(!$.dayPoint.tryParse([]));
        ok(!$.dayPoint.tryParse({}));
        ok(!$.dayPoint.tryParse(function() { }));
    });
    test('assumeNow/today', function () {
        expect(1);
        var now = $.dayPoint(2016, 2, 28);
        $.dayPoint.assumeNow(now);
        ok($.dayPoint.today().equals(now));
    });
});
