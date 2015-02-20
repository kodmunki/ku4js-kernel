//================================
// kodmunki™ QUnit Test Extensions
//================================

//Opposite test for ok
function notOk(s, m) { ok(!$.exists(s), m); }

//Performance test
function performanceOk(func, within) {
    var performance = $.ku4performance(func);
    ok(performance.within(within), performance.note());
}