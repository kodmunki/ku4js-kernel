var $ = require('../../lib/base/__asserters'),
    $dayPoint = require('../../lib/dateTime/dayPoint'),
    date = $dayPoint(2011, 1, 1);

exports['create'] = function (test) {
    test.expect(15);
    test.ok(!$dayPoint(null));
    test.ok(!$dayPoint(undefined));
    test.ok($dayPoint(2011, 1, 1));
    test.ok($dayPoint.parse("01/01/2011"));
    test.ok($dayPoint.parse(new Date("1/1/2011")));
    test.equal(date.day(), 6);
    test.equal(date.date(), 1);
    test.equal(date.month(), 1);
    test.equal(date.year(), 2011);
    test.equal(date.hour(), "00");
    test.equal(date.minute(), "00");
    test.equal(date.second(), "00");
    test.equal(date.millisecond(), "00");
    test.equal(date.isWeekday(), false);
    test.equal(date.isWeekend(), true);
    test.done();
};
exports['toString'] = function (test) {
    test.expect(7);
    test.throws(function(){$dayPoint(null).toString()});
    test.throws(function(){$dayPoint(undefined).toString()});
    test.equal($dayPoint(2011, 1, 1).toString(), "01/01/2011");
    test.throws(function(){$dayPoint.parse(null).toString()});
    test.throws(function(){$dayPoint.parse(undefined).toString()});
    test.equal($dayPoint.parse("1/1/2011").toString(), "01/01/2011");
    test.equal($dayPoint.parse(new Date("1/1/2011")).toString(), "01/01/2011");
    test.done();
};
exports['toDate'] = function (test) {
    test.expect(8);
    test.throws(function(){$dayPoint(null).toDate()});
    test.throws(function(){$dayPoint(undefined).toDate()});
    test.equal($dayPoint(2011, 1, 1).toDate().toString(), new Date("01/01/2011").toString());
    test.throws(function(){$dayPoint.parse(null).toDate()});
    test.throws(function(){$dayPoint.parse(null).toDate()});
    test.throws(function(){$dayPoint.parse(undefined).toDate()});
    test.equal($dayPoint.parse("1/1/2011").toDate().toString(), new Date("01/01/2011").toString());
    test.equal($dayPoint.parse(new Date("1/1/2011")).toDate().toString(), new Date("01/01/2011").toString());
    test.done();
};
exports['navigation'] = function (test) {
    test.expect(15);
    test.ok(date.equals($dayPoint.parse("1/1/2011")));
    test.ok(date.nextDay().equals($dayPoint.parse("1/2/2011")));
    test.ok(date.prevDay().equals($dayPoint.parse("12/31/2010")));
    test.ok(date.nextMonth().equals($dayPoint.parse("2/1/2011")));
    test.ok(date.prevMonth().equals($dayPoint.parse("12/1/2010")));
    test.ok(date.nextYear().equals($dayPoint.parse("1/1/2012")));
    test.ok(date.prevYear().equals($dayPoint.parse("1/1/2010")));
    test.ok(date.firstDayOfMonth().equals($dayPoint.parse("1/1/2011")));
    test.ok(date.lastDayOfMonth().equals($dayPoint.parse("1/31/2011")));
    test.ok(date.isAfter($dayPoint.parse("12/31/2010")));
    test.ok(!date.isBefore($dayPoint.parse("12/31/2010")));
    test.ok(!date.isAfter($dayPoint.parse("2/1/2011")));
    test.ok(date.isBefore($dayPoint.parse("2/1/2011")));
    test.ok(date.isBefore($dayPoint.parse("2/1/2011")));
    test.ok(date.isBefore($dayPoint.parse("2/1/2011")));
    test.done();
};
exports['canParse'] = function (test) {
    test.expect(10);
    test.ok($dayPoint.canParse("1/1/2011"));
    test.ok($dayPoint.canParse(new Date("1/1/2011")));
    test.ok($dayPoint.canParse(1));
    test.ok(!$dayPoint.canParse(null));
    test.ok(!$dayPoint.canParse(undefined));
    test.ok(!$dayPoint.canParse(""));
    test.ok(!$dayPoint.canParse("A"));
    test.ok(!$dayPoint.canParse([]));
    test.ok(!$dayPoint.canParse({}));
    test.ok(!$dayPoint.canParse(function() { }));
    test.done();
};
exports['parse'] = function (test) {
    test.expect(10);
    test.ok($dayPoint.parse("1/1/2011"));
    test.ok($dayPoint.parse(new Date("1/1/2011")));
    test.ok($dayPoint.parse(1));
    test.ok(!$dayPoint.parse(null));
    test.ok(!$dayPoint.parse(undefined));
    test.ok(!$dayPoint.parse(""));
    test.ok(!$dayPoint.parse("A"));
    test.ok(!$dayPoint.parse([]));
    test.ok(!$dayPoint.parse({}));
    test.ok(!$dayPoint.parse(function() { }));
    test.done();
};
exports['today'] = function (test) {
    test.expect(1);
    test.ok($dayPoint.today());
    test.done();

};
exports['now'] = function (test) {
    test.expect(4);
    test.ok($dayPoint.today().equals($dayPoint.parse(new Date())));
    $dayPoint.assumeNow($dayPoint.parse("1/1/2011"));
    test.ok($dayPoint.today().equals($dayPoint.parse(new Date("1/1/2011"))));
    $dayPoint.assumeNow(new Date("2/2/2011"));
    test.ok($dayPoint.today().equals($dayPoint.parse(new Date("2/2/2011"))));
    $dayPoint.assumeNow("3/3/2011");
    test.ok($dayPoint.today().equals($dayPoint.parse(new Date("3/3/2011"))));
    test.done();
};