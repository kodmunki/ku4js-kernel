function dayPoint(year, month, date, hours, minutes, seconds, milliseconds) {
    if ((month < 1) || (month > 12)) throw new $.exception("arg", "Invalid month at $.dayPoint");
    if ((date < 1) || (date > dayPoint_findDaysInMonth(month, year))) throw new $.exception("arg", "Invalid date at $.dayPoint");
    
    this._value = (arguments.length >= 3)
        ? new Date(year, month - 1, date, hours || 0, minutes || 0, seconds || 0, milliseconds || 0)
        : new Date();
        
    var v = this._value;
    function formatTime(t){ return t < 10 ? "0" + t : "" + t; }
    
    this._day = v.getDay();
    this._date = date;
    this._month = month;
    this._year = year;
    this._hour = formatTime(v.getHours());
    this._minute = formatTime(v.getMinutes());
    this._second = formatTime(v.getSeconds());
    this._millisecond = formatTime(v.getMilliseconds());
    
    var d = this._day;
    this._isWeekday = d > 0 && d < 6;
    this._isWeekend = !this._isWeekday;
}

dayPoint.prototype = {
    value: function(){ return this._value; },

    day: function(){ return this._day; },
    date: function(){ return this._date; },
    month: function(){ return this._month; },
    year: function(){ return this._year; },
    hour: function(){ return this._hour; },
    minute: function(){ return this._minute; },
    second: function(){ return this._second; },
    millisecond: function(){ return this._millisecond; },
    isWeekday: function(){ return this._isWeekday; },
    isWeekend: function(){ return this._isWeekend; },
    
    equals: function(other) { return this._value == other.value(); },
    nextDay: function() { return dayPoint_createDay(this, 1, 0, 0); },
    prevDay: function() { return dayPoint_createDay(this, -1, 0, 0); },
    nextMonth: function() { return dayPoint_createDay(this, 0, 1, 0); },
    prevMonth: function() { return dayPoint_createDay(this, 0, -1, 0); },
    nextYear: function() { return dayPoint_createDay(this, 0, 0, 1); },
    prevYear: function() { return dayPoint_createDay(this, 0, 0, -1); },
    add: function(years, months, days) {
        function a(x, n, method) {
            var d = x, c = n;
            while(c--) d = d[method]();
            return d;
        }
        var b = years < 0,
            abs = Math.abs,
            y = abs(years),
            d = abs(days),
            m = abs(months),
            ym = b ? "prevYear" : "nextYear",
            dm = b ? "prevDay" : "nextDay",
            mm = b ? "prevMonth" : "nextMonth";
        return a(a(a(this, y, ym), m, mm), d, dm);
    },
    firstDayOfMonth: function() { return new dayPoint(this._year, this._month, 1); },
    lastDayOfMonth: function() { return new dayPoint(this._year, this._month, dayPoint_findDaysInMonth(this._month, this._year)); },
    isBefore: function(other) { return !(this.isAfter(other) || this.equals(other)); },
    isAfter: function(other) {
        var ty = this._year,
            oy = other.year(),
            tm = this._month,
            om = other.month();
        if (ty > oy) return true;
        if ((ty == oy) && (tm > om)) return true;
        if ((ty == oy) && (tm == om) && (this._date > other.date())) return true;
        return false;
    },
    equals: function(other) {
        return (this._year == other.year()) && (this._month == other.month()) && (this._date == other.date());
    },
    toString: function() {
        var y = this._year, m = this._month, d = this._date,
            f = (m < 10 && d < 10) ? "0{1}/0{2}/{0}" : 
                (m < 10) ? "0{1}/{2}/{0}" :
                (d < 10) ? "{1}/0{2}/{0}" : "{1}/{2}/{0}";
        return $.str.format(f, y, m, d);
    },
    toDate: function() { return this.value(); }
}

$.dayPoint = function(year, month, date, hours, minutes, seconds, milliseconds){
    if(!($.isDate(year) ||
         ($.isNumber(year) &&
          $.isNumber(month) &&
          $.isNumber(date)))) return null;
    return new dayPoint(year, month, date, hours, minutes, seconds, milliseconds);
}
$.dayPoint.canParse = function(v) {
    return ($.isString(v) ||
            $.isNumber(v) ||
            $.isDate(v))
        ? !isNaN(new Date(v).valueOf())
        : false;
}
$.dayPoint.parse = function(v) {
        if (v instanceof dayPoint) return v;
        if (!($.isDate(v) || this.canParse(v))) return null;

        var D = new Date(v),
            y = D.getFullYear(),
            m = D.getMonth() + 1,
            d = D.getDate(),
            h = D.getHours(),
            M = D.getMinutes(),
            s = D.getSeconds(),
            ms = D.getMilliseconds();

        return $.dayPoint(y, m, d, h, M, s, ms);
}
$.dayPoint.tryParse = function(v){
    return $.dayPoint.canParse(v)
        ? $.dayPoint.parse(v)
        : null;
}

var dayPoint_assumeNow;

$.dayPoint.assumeNow = function(dayPoint) { dayPoint_assumeNow = $.dayPoint.parse(dayPoint); }
$.dayPoint.today = function() { return dayPoint_assumeNow || $.dayPoint.parse(new Date()); }

function dayPoint_findDaysInMonth(month, year) {
    var m = month, y = year;
    if (m == 2) return (dayPoint_isLeapYear(y)) ? 29 : 28;
    return (((m < 8) && ($.isEven(m))) || ((m > 7) && ($.isOdd(m)))) ? 30 : 31;
}
function dayPoint_isLeapYear(year) {
    var y = year.toString().split(/\B/),
        d = parseFloat($.str.build(y[y.length - 2], y[y.length - 1]));
    return (d % 4 == 0);
}
function dayPoint_createDay(dp, d, m, y) {
    var tm = dp.month(), ty = dp.year(), td = dp.date(), ld = dayPoint_findDaysInMonth(tm, ty),
        dd = d, mm = m, yy = y, date = td + dd, month = tm + mm, year = ty + yy;

    if ((td + dd) > ld) { date = 1; month = (tm + (mm + 1)); }
    if ((td + dd) < 1) { var pm = dp.prevMonth(), date = dayPoint_findDaysInMonth(pm.month(), pm.year()); (month = tm + (mm-1)); }

    if ((month) > 12) { month = 1; year = (ty + (yy + 1)); }
    if ((month) < 1) { month = 12; year = (ty + (yy - 1)); }

    var dim = dayPoint_findDaysInMonth(month, year);
    date = (date > dim) ? dim : date;
    
    return new dayPoint(year, month, date);
}