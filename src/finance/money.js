function money(amt, type) {
    if (!$.exists(amt) || isNaN(amt))
        throw $.ku4exception("$.money", $.str.format("Invalid amount= {0}. Amount must be a number.", amt));
    money.base.call(this);
    var dollars = $.math.roundDown(amt);
    this._cents = amt - dollars;
    this._dollars = dollars;
    this._type = type || "$";
    this._value = amt;
}
money.prototype = {
    cents: function(){ return this._cents; },
    dollars: function(){ return this._dollars; },
    type: function(){ return this._type; },
    value: function(){ return this._value; },
    
    add: function(other) {
        money_checkType(this, other);
        return new money(this._value + other.value(), this._type);
    },
    divide: function(value) {
        if(!$.isNumber(value))
            throw $.ku4exception("$.money", $.str.format("Invalid divisor value= {0}", value));
        return new money(this._value / value, this._type);
    },
    equals: function(other) {
        return (this.isOfType(other)) && (this._value == other.value());
    },
    isOfType: function(other) {
        return this._type == other.type();
    },
    isGreaterThan: function(other) {
        money_checkType(this, other);
        return this._value > other.value();
    },
    isLessThan: function(other) {
        money_checkType(this, other);
        return this._value < other.value();
    },
    multiply: function(value) {
        if(!$.isNumber(value))
            throw $.ku4exception("$.money", $.str.format("Invalid multiplier value= {0}", value));
        return new money(this._value * value, this._type);
    },
    round: function() {
        return new money($.math.round(this.value(), -2), this._type);
    },
    roundDown: function() {
        return new money($.math.roundDown(this.value(), -2), this._type);
    },
    roundUp: function() {
        return new money($.math.roundUp(this.value(), -2), this._type);
    },
    subtract: function(other) {
        money_checkType(this, other);
        return new money(this._value - other.value(), this._type);
    },
    toString: function(tens, tenths) {
        var format = (this.value < 0) ? "({0}{1}{2}{3})" : "{0}{1}{2}{3}",
            separator = tenths || ".";
        return $.str.format(format, this._type, money_formatDollars(this, tens), separator, money_formatCents(this));
    }
};
$.Class.extend(money, $.Class);

$.money = function(number, type){ return new money(number, type); };
$.money.Class = money;

$.money.zero = function(type) { return $.money(0, type); };
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

function money_checkType(money, other) {
    if (!money.isOfType(other))
        throw $.ku4exception("$.money", $.str.format("Invalid operation on non-conforming currencies. type: {0} != type: {1}", money._type, other._type));
}
function money_formatDollars(money, separator) {
    var dollars = money.dollars(),
        anount = (money.cents() >= .995) ? (dollars + 1) : dollars,
        s = anount.toString(),
        d = s.replace(/\-/, "").split(/\B/).reverse(),
        l = d.length,
        b = l > 3,
        i = 0,
        a = [];
    while (i < l) {
        a[a.length] = d[i]; i++;
        if (!$.exists(d[i])) break; 
        if ((i % 3 == 0) && b) a[a.length] = separator || ",";
    }
    return $.str.build.apply(this, a.reverse());
}
function money_formatCents(money) {
    var C = $.math.round(money.cents(), -3),
        s = C.toString(),
        c = s.replace(/\-|(0\.)/g, "").concat("0").split(/\B/), l = c.length;
    if ($.isZero(l) || C >= .995) return "00";
    if (l < 2) return "0" + c[0];
    return (parseInt(c[2]) > 4) ? c[0] + (parseInt(c[1]) + 1) : c[0] + c[1];
}