function ku4_performance(func) {
    this._func = func;
    this._testNotRun = "Test not run. Call within() to run test.";
}
ku4_performance.prototype = {
    mark0: function() { return this._mark0 || NaN; },
    mark1: function() { return this._mark1 || NaN; },
    time: function() { return this._time || NaN; },
    note: function() { return this._note || this._testNotRun; },

    within: function(m) {
        var m0 = ku4_performance_mark();
        this._func();
        var m1 = ku4_performance_mark();

        this._mark0 = m0;
        this._mark1 = m1;
        this._time = m1 - m0;

        var t = this._time;
        this._note = ku4_performance_note(t, m);
        return t <= m;
    }
};

function ku4_performance_mark() {
    return ($.exists(performance)) ? performance.now() : (new Date()).valueOf();
}

function ku4_performance_note(t, m) {
    return (t <= m) ? "Pass" : $.str.format("Performance Fail - Expected: {0} but was: {1}", m, t);
}

$.ku4performance = function(func) { return new ku4_performance(func); };