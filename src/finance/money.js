function money(amt, type) {
    if (isNaN(amt)) throw new $.exception("arg", $.str.format("$.money requires a number. Passed {0}", amt));
    var x = amt.toString().split(/\./), d = x[0], c = x[1];
    function cents(c) { return (amt < 0) ? -c : c; }
    
    this._cents = ($.exists(c)) ? cents(parseFloat("." + c)) : 0;
    this._dollars = parseInt(d);
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
        return new money(this._value + other.value());
    },
    divide: function(value) {
        if(!$.isNumber(value))
            throw new Error();
        return new money(this._value / value);
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
            throw new Error();
        return new money(this._value * value);
    },
    round: function() {
        return new money($.math.round(this.value, -2));
    },
    roundDown: function() {
        return new money($.math.roundDown(this.value, -2));
    },
    roundUp: function() {
        return new money($.math.roundUp(this.value, -2));
    },
    subtract: function(other) {
        money_checkType(this, other);
        return new money(this._value - other.value());
    },
    toString: function() {
        var format = (this.value < 0) ? "({0}{1}.{2})" : "{0}{1}.{2}";
        return $.str.format(format, this._type, money_formatDollars(this), money_formatCents(this));
    }
}
$.money = function(number, type){ return new money(number, type); }
$.money.zero = function() { return $.money(0); }
$.money.isMoney = function(o) { return o instanceof money; }
$.money.canParse = function(v){
    try {
        $.money.parse(v);
        return true;
    }
    catch(e){ return false; }
}
$.money.parse = function(str) {
    if($.isNumber(str)) return $.money(str);
    var b = /(\(.*\))|(\-)/.test(str),
        i = (b) ? 1 : 0,
        u = str.match(/[^\d\.\,\-]/g) || [],
        U = $.exists(u[i]) ? u[i] : "$",
        n = parseFloat(str.replace(/[^\d\.]/g, "")),
        v = (b) ? -n : n;
    return $.money(v, U);
}
$.money.tryParse = function(o){
    return $.money.canParse(o)
        ? $.money.parse(o)
        : null;
}

money_checkType = function(money, other) {
    if (!money.isOfType(other)) throw new $.exception("operation","Invalid operation on non-conforming currencies.");
}
money_formatDollars = function(money) {
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
        if ((i % 3 == 0) && b) a[a.length] = ",";
    }
    return $.str.build.apply(this, a.reverse());
}
money_formatCents = function(money) {
    var C = $.math.round(money.cents(), -3),
        s = C.toString(),
        c = s.replace(/\-|(0\.)/g, "").concat("0").split(/\B/), l = c.length;
    if ($.isZero(l) || C >= .995) return "00";
    if (l < 2) return "0" + c[0];
    return (parseInt(c[2]) > 4) ? c[0] + (parseInt(c[1]) + 1) : c[0] + c[1];
}