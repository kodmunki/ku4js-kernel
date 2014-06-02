function money(amt, currency) {
    if (!$.exists(amt) || isNaN(amt))
        throw $.ku4exception("$.money", $.str.format("Invalid amount= {0}. Amount must be a number.", amt));
    money.base.call(this);
    var dollars = $.math.roundTowardZero(amt);
    this._cents = amt - dollars;
    this._dollars = dollars;
    this._currency = currency || "$";
    this._value = amt;
}
money.prototype = {
    value: function(){ return this._value; },
    dollars: function(){ return this._dollars; },
    cents: function(){ return this._cents; },
    currency: function(){ return this._currency; },
    add: function(other) {
        money_checkCurrency(this, other);
        return new money(this._value + other.value(), this._currency);
    },
    divide: function(value) {
        if(!$.isNumber(value))
            throw $.ku4exception("$.money", $.str.format("Invalid divisor value= {0}", value));
        return new money(this._value / value, this._currency);
    },
    equals: function(other) {
        return (this.isOfCurrency(other)) && (this._value == other.value());
    },
    exchange: function(rate, currency) {
        return new money(this.multiply(rate).value(), currency);
    },
    isOfCurrency: function(other) {
        return this._currency == other.currency();
    },
    isGreaterThan: function(other) {
        money_checkCurrency(this, other);
        return this._value > other.value();
    },
    isLessThan: function(other) {
        money_checkCurrency(this, other);
        return this._value < other.value();
    },
    multiply: function(value) {
        if(!$.isNumber(value))
            throw $.ku4exception("$.money", $.str.format("Invalid multiplier value= {0}", value));
        return new money(this._value * value, this._currency);
    },
    nearestDollar: function() {
        return new money($.math.round(this.value(), 0), this._currency);
    },
    round: function() {
        return new money($.math.round(this.value(), -2), this._currency);
    },
    roundDown: function() {
        return new money($.math.roundDown(this.value(), -2), this._currency);
    },
    roundUp: function() {
        return new money($.math.roundUp(this.value(), -2), this._currency);
    },
    subtract: function(other) {
        money_checkCurrency(this, other);
        return new money(this._value - other.value(), this._currency);
    },
    toString: function(digitSeparator, decimalMark) {
        var money = this.round(),
            format = (money.isLessThan($.money.zero())) ? "({0}{1}{2}{3})" : "{0}{1}{2}{3}",
            separator = digitSeparator || ",",
            mark = decimalMark || ".";
        var dollars = money_formatDollars(money.dollars(), separator);
        var cents = money_formatCents(money.cents());

        return $.str.format(format, this._currency, dollars , mark, cents);
    }
};
$.Class.extend(money, $.Class);

$.money = function(number, currency){ return new money(number, currency); };
$.money.Class = money;

$.money.zero = function(currency) { return $.money(0, currency); };
$.money.isMoney = function(o) { return o instanceof money; };
$.money.canParse = function(v){
    try {
        $.money.parse(v);
        return true;
    }
    catch(e){ return false; }
};
$.money.parse = function(str) {
    if($.isNumber(str)) return $.money(str);
    var b = /(\(.*\))|(\-)/.test(str),
        i = (b) ? 1 : 0,
        u = str.match(/[^\d\.\,\-]/g) || [],
        U = $.exists(u[i]) ? u[i] : "$",
        n = parseFloat(str.replace(/[^\d\.]/g, "")),
        v = (b) ? -n : n;
    return $.money(v, U);
};
$.money.tryParse = function(o){
    return $.money.canParse(o)
        ? $.money.parse(o)
        : null;
};

function money_checkCurrency(money, other) {
    if (!money.isOfCurrency(other))
        throw $.ku4exception("$.money", $.str.format("Invalid operation on non-conforming currencies. currency: {0} != currency: {1}", money._currency, other._currency));
}
function money_formatDollars(dollars, separator) {
    if ($.isZero(dollars)) return "0";

    var _dollars = dollars.toString(),
        chars = _dollars.replace(/[^\d]/, "").split(/\B/)   .reverse(),
        isThousandPlus = _dollars.length > 3,
        mark = separator || ",",
        marked = $.list(),
        i = 0;

    $.list(chars).each(function(number){
        if (i != 0 && (i % 3 == 0)) { marked.add(mark); i = 0; }
        marked.add(number);
        i++;
    });

    return $.str.build.apply(this, marked.toArray().reverse()).replace(/[^\d]$/, "");
}
function money_formatCents(cents) {
    var rounded = Math.abs($.math.round(cents, -2)),
        _cents = rounded.toString().replace(/[^\d]|0\./g, "");

    if ($.isZero(rounded)) return "00";
    if (rounded < .10) return "0" + _cents;
    if (rounded % .10 == 0) return _cents + "0";
    return _cents;
}