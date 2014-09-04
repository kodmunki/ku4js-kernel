function dayPoint(year, month, date) {
    dayPoint.base.call(this);
    if ((month < 1) || (month > 12))
        throw $.ku4exception("$.dayPoint", $.str.format("Invalid month= {0}", month));
    if ((date < 1) || (date > dayPoint_findDaysInMonth(month, year)))
        throw $.ku4exception("$.dayPoint", $.str.format("Invalid date= {0}", date));
    
    this._value = (arguments.length >= 3)
        ? new Date(year, month - 1, date)
        : new Date();

    this._day = this._value.getDay();
    this._date = date;
    this._month = month;
    this._year = year;
}

dayPoint.prototype = {
    value: function(){ return this._value; },
    day: function(){ return this._day; },
    date: function(){ return this._date; },
    month: function(){ return this._month; },
    year: function(){ return this._year; },
    shortYear: function(){
        var y = this._year.toString();
        return parseInt(y.substr(y.length-2));
    },
    isWeekday: function(){
        var d = this._day;
        return d > 0 && d < 6;
    },
    isWeekend: function(){ return !this.isWeekday(); },
    isLeapYear: function() { return dayPoint_isLeapYear(this._year); },
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
        var abs = Math.abs,
            y = abs(years),
            d = abs(days),
            m = abs(months),
            ym = years < 0 ? "prevYear" : "nextYear",
            dm = days < 0 ? "prevDay" : "nextDay",
            mm = months < 0 ? "prevMonth" : "nextMonth";
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
        return ((ty == oy) && (tm == om) && (this._date > other.date()));
    },
    equals: function(other) {
        return (this._year == other.year()) && (this._month == other.month()) && (this._date == other.date());
    },
    toString: function() {
        return this.toStringWithFormat("mm/dd/yyyy");
    },
    toStringWithFormat: function(format)
    {
        var y = (/y{3,}/i.test(format)) ? this._year : this.shortYear(),
            m = this._month,
            d = this._date,
            yf = "{0}",
            mf = (/m{2}/i.test(format) && m < 10) ? "0{1}" : "{1}",
            df = (/d{2}/i.test(format) && d < 10) ? "0{2}" : "{2}";
            f = format.replace(/y{1,}/gi, yf).replace(/m{1,}/gi, mf).replace(/d{1,}/gi, df);

        return $.str.format(f, y, m, d);
    },
    toDate: function() { return this.value(); },
    toJson: function() { return this.value().toJSON(); }
};
$.Class.extend(dayPoint, $.Class);

$.dayPoint = function(year, month, date, hours, minutes, seconds, milliseconds){
    if(!($.isDate(year) ||
         ($.isNumber(year) &&
          $.isNumber(month) &&
          $.isNumber(date)))) return null;
    return new dayPoint(year, month, date, hours, minutes, seconds, milliseconds);
};
$.dayPoint.Class = dayPoint;

$.dayPoint.canParse = function(v) {
    return ($.isString(v) ||
            $.isNumber(v) ||
            $.isDate(v))
        ? !isNaN(new Date(v).valueOf())
        : false;
};
$.dayPoint.parse = function(value) {
    if (value instanceof dayPoint) return value;

    var v = ($.isString(value) && /^\d{4}\-\d{2}\-\d{2}$/.test($.str.trim(value)))
                ? value.replace(/(?:\D)(0)/g,"-").replace(/^0/,"")
                : value,
        D = new Date(v);

    if(!$.exists(v) || isNaN(D).valueOf())
        throw $.ku4exception("$.dayPoint", $.str.format("Cannot parse value= {0}", v));

    return $.dayPoint(D.getFullYear(), D.getMonth() + 1, D.getDate());
};
$.dayPoint.tryParse = function(v){
    return $.dayPoint.canParse(v) ? $.dayPoint.parse(v) : null;
};

var dayPoint_assumeNow;

$.dayPoint.assumeNow = function(dayPoint) { dayPoint_assumeNow = $.dayPoint.parse(dayPoint); };
$.dayPoint.today = function() { return dayPoint_assumeNow || $.dayPoint.parse(new Date()); };

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