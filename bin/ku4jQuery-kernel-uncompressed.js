(function(l){ $=l;
$.isArray = function(x) { return x instanceof Array; }
$.isBool = function(x) { return (/boolean/i.test(typeof (x))); }
$.isDate = function(x) { return x instanceof Date; }
$.isEvent = function(x) { try { return x instanceof Event; } catch(e){ return x === window.event; }}
$.isNumber = function(x) { return (/number/i.test(typeof (x))) && !isNaN(x); }
$.isObject = function(x) { return $.exists(x) && (/object/i.test(typeof (x))); }
$.isFunction = function(x) { return (x instanceof Function); }
$.isString = function(x) { return (/string/i.test(typeof (x))) || x instanceof String; }
$.isZero = function(n) { return n === 0; }
$.isEven = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : n % 2 === 0)); }
$.isOdd = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : !$.isEven(n))); }
$.isNull = function(x) { return x === null; }
$.isUndefined = function(x) { return (/undefined/i.test(typeof (x))); }
$.isEmpty = function(s) { return $.isString(s) && $.isZero(s.split(/\B/).length); }
$.isNullOrEmpty = function(s) { return !$.exists(s) || $.isEmpty(s); }
$.exists = function(x) { return (x !== null) && (!$.isUndefined(x)); }
$.areEqual = function(value1, value2) {
    if(this.exists(value1) && this.exists(value2)) {
        if(this.exists(value1.equals) && value.equals(value2)) return true;
        if(this.exists(value1.getTime) && this.exists(value2.getTime) && value1.getTime() == value2.getTime()) return true;
        if(value1 === value2) return true;
    }
    else if (value1 === value2) return true;
}
$.xor = function(a, b) { return !a != !b; }

$.replicate = function(value) {
    var result = ($.isDate(value))
        ? new Date(value)
        : ($.isArray(value))
            ? []
            : ($.isObject(value))
                ? {} : value,
        v;
    for (n in value) {
        v = value[n];
        result[n] = (($.isArray(v)) ||
                     ($.isObject(v)))
                        ? $.replicate(v) : v;
    }
    return result;
}

if(!$.exists($.obj)) $.obj = { }
$.obj.keys = function(o) {
    var r = [];
    for (n in o) r[r.length] = n;
    return r;
}
$.obj.values = function(o) {
    var r = [];
    for (n in o) r[r.length] = o[n];
    return r;
}
$.obj.count = function(o){
    var c = 0;
    for(n in o) c++;
    return c;
}
$.obj.hasProp = function(obj, prop){
    return ($.exists(obj.hasOwnProperty))
        ? obj.hasOwnProperty(prop)
        : false;
}
$.obj.merge = function(obj1, obj2){
    var mergee = $.replicate(obj2);
    for (n in obj1) mergee[n] = obj1[n];
    return mergee;
}
$.obj.meld = function(obj1, obj2){
    var meldee = $.replicate(obj2);
    for (n in obj1) {
        if($.exists(meldee[n])) continue;
        meldee[n] = obj1[n];
    }
    return meldee;
}

$.Class = function(){ }
$.Class.prototype = {
    get: function(p){ return this["_"+p]; },
    set: function(p, v){ this["_"+p] = v; return this; },
    property: function(p, v){
        return ($.isUndefined(v))
            ? this.get(p)
            : this.set(p, v);
    }
}

$.Class.extend = function(sub, sup) {
    if(!sub || !sup) return null;
    var proto = function() { };
    proto.prototype = sup.prototype;
    sub.base = sup;
    sub.prototype = $.obj.merge(sub.prototype, new proto());
    sub.prototype.constructor = sub;
    return sub;
}

function lock(isLocked) {
    lock.base.call(this);
    this._isLocked = isLocked || false;
}
lock.prototype = {
    isLocked: function(){ return this.get("isLocked"); },
    lock: function() { this._isLocked = true; return this; },
    unlock: function() { this._isLocked = false; return this; }
}
$.Class.extend(lock, $.Class);
$.lock = function(isLocked){return new lock(isLocked);}

if(!$.exists($.math)) $.math = { }
$.math.round = function(n, d){
    var p = d || 0,
        m = Math.pow(10, -p);
    return Math.round(parseFloat((n * m).toFixed(Math.abs(p)))) / m;
}
$.math.roundUp = function(n, d){
    var p = d || 0,
        r = 5 * (Math.pow(10, p - 1));
    return $.math.round(n + r, d);
}
$.math.roundDown = function(n, d){
    var p = d || 0,
        r = 5 * (Math.pow(10, p - 1));
    return $.math.round(n - r, d);
}
$.math.factorial = function(n){
    var v = n, i = n;
    while(i--) if(!!i) v *= i;
    return v;
}
$.math.divide = function(a, b){
    var isValid = $.isNumber(a) && $.isNumber(b) && !$.isZero(b);
    if(!isValid)
        throw new Error($.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}",
                                     a, b, typeof a, typeof b));
    return a / b;
}

if(!$.exists($.str)) $.str = { }
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
$.str.build = function() {
    return "".concat.apply(new String(), arguments);
}
$.str.format = function() {
    var a = arguments, s = a[0], l = a.length,  A, S;
    for (i = 1; i < l; i++) {
        A = a[i];
        S = ($.isNull(A)) ? "null" : ($.isUndefined(A)) ? "undefined" : A.toString();
        s = s.replace(RegExp("\\{" + (i - 1) + "\\}", "g"), S);
    }
    return s;
}
$.str.parse = function(){
    return String.fromCharCode.apply(String, arguments);
}
$.str.trim = function(s) {
    return $.str.trimStart($.str.trimEnd(s));
}
$.str.trimStart = function(s) {
    if(!$.isString(s)) throw new Error("Cannot trim non-string values");
    return ($.exists(s.replace))
        ? s.replace(/^\s*\b/, "") : s;
}
$.str.trimEnd = function(s) {
    if(!$.isString(s)) throw new Error("Cannot trim non-string values");
    return ($.exists(s.replace))
        ? s.replace(/\b\s*$/, "") : s;
}
$.str.encodeBase64 = function(strng) {
    var value = "", i = 0, s = $.str.encodeUtf8(strng),
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        code = function(n) { return s.charCodeAt(n); },
        chr = function(enc) { return chars.charAt(enc) };

    while (i < s.length) {
        chr1 = code(i++);
        chr2 = code(i++);
        chr3 = code(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) enc3 = enc4 = 64;
        else if (isNaN(chr3)) enc4 = 64;

        value += (chr(enc1) + chr(enc2) + chr(enc3) + chr(enc4));
    }
    return value;
}
$.str.decodeBase64 = function(strng) {
    var value = "", i = 0, s = strng.replace(/[^A-Za-z0-9\+\/\=]/g, ""),
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        enc = function(n) { return chars.indexOf(s.charAt(n)); },
        chr = function (code) { return String.fromCharCode(code); };

    while (i < s.length) {
        enc1 = enc(i++);
        enc2 = enc(i++);
        enc3 = enc(i++);
        enc4 = enc(i++);
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        value += chr(chr1);
        if (enc3 != 64) value += chr(chr2);
        if (enc4 != 64) value += chr(chr3);

    }
    return $.str.decodeUtf8(value);
}
$.str.encodeUtf8 = function(strng) {
    var value = "", s = strng.replace(/\r\n/g,"\n"),
        code = function(n) { return s.charCodeAt(n); },
        chr = function (code) { return String.fromCharCode(code); };

    for (var i = 0; i < s.length; i++) {

        var c = code(i);

        if (c < 128) value += chr(c);
        else if((c > 127) && (c < 2048))
            value += (chr((c >> 6) | 192) + chr((c & 63) | 128));
        else
            value += chr((c >> 12) | 224) +
                     chr(((c >> 6) & 63) | 128) +
                     chr((c & 63) | 128);
    }
    return value;
}
$.str.decodeUtf8 = function(strng) {
    var value = "", i = 0, c = 0, c1 = 0, c2 = 0, s = strng,
        code = function(n) { return s.charCodeAt(n); },
        chr = function (code) { return String.fromCharCode(code); };

    while ( i < s.length ) {
        c = code(i);

        if (c < 128) {
            value += chr(c); i++;
        }
        else if((c > 191) && (c < 224)) {
            c1 = code(i+1);
            value += chr(((c & 31) << 6) | (c1 & 63));
            i += 2;
        }
        else {
            c1 = code(i+1);
            c2 = code(i+2);
            value += chr(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
            i += 3;
        }
    }
    return value;
}

$.uid = function(str) {
	var a = Math.random().toString().replace(/\b\.\b/, ""),
	    b = Math.random().toString().replace(/\b\.\b/, "");
	return $.str.encodeBase64($.str.format("{0}x{1}", a, b)).replace(/=+/g,"0").substr(3,32);
}

function emailAddress(username, domain, topLevelDomain) {
    this._username = username;
    this._domain = domain;
    this._topLevelDomain = topLevelDomain;
}
emailAddress.prototype = {
    username: function(){ return this._username; },
    domain: function(){ return this._domain; },
    topLevelDomain: function(){ return this._topLevelDomain; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.username() == this._username &&
                other.domain() == this._domain &&
                other.topLevelDomain() == this._topLevelDomain;
    },
    toString: function() {
        return $.str.format("{0}@{1}.{2}", this._username, this._domain, this._topLevelDomain);
    }
}
$.emailAddress = function(username, domain, topLevelDomain) {
    return new emailAddress(username, domain, topLevelDomain);
}
$.emailAddress.parse = function(str){
    if (!($.exists(str)) && /@{1}/.test(str)) return null;

    var splitOnAt = str.split("@"),
        lastPart = splitOnAt[1],
        split = lastPart.split("."),
        username = splitOnAt[0]
        topLevelDomain = split.splice(split.length-1, 1),
        domain = split.join(".");

    return new emailAddress(username, domain, topLevelDomain);
}

function phoneNumber(number) { this._value = number; }
phoneNumber.prototype = {
    value: function() { return this._value; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return other.value() == this._value;
    },
    toStringWithFormat: function(format) {
        var formattedValue = format;
        $.list((this._value.toString().split(""))).each(function(number){
            formattedValue.replace("#", number);
        });
        return formattedValue.replace(/#/g, "");
    }
}
$.phoneNumber = function(number){ return new phoneNumber(number); }
$.phoneNumber.parse = function(str) {
    return new phoneNumber(parseInt(str.replace(/[^0-9]/gi, "")));
}

function properName(first, middle, last) {
    this._first = first;
    this._middle = middle || "";
    this._last = last;
}
properName.prototype = {
    first: function(){ return this._first; },
    middle: function(){ return this._middle; },
    last: function(){ return this._last; },
    full: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{F} {L}" : "{F} {M} {L}"
        return this.toStringWithFormat(format);
    },
    initials: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{f}.{l}." : "{f}.{m}.{l}."
        return this.toStringWithFormat(format);
    },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.first() == this._first &&
                other.middle() == this._middle &&
                other.last() == this._last;
    },
    toStringWithFormat: function(format) {
        var firstInitial = this._first.charAt(0),
            middleInitial = this._middle.charAt(0),
            lastInitial = this._last.charAt(0);

        return format.replace("{F}", this._first)
                     .replace("{M}", this._middle)
                     .replace("{L}", this._last)
                     .replace("{f}", firstInitial)
                     .replace("{m}", middleInitial)
                     .replace("{l}", lastInitial);
    }
}
$.properName = function(first, middle, last) { return new properName(first, middle, last); }

function hash(obj) {
    hash.base.call(this);
    var o = (!$.exists(obj) || !obj.toObject) ? obj : obj.toObject();
    this.$h = ($.exists(o)) ? o : {};
    this._count = 0;
    for (n in this.$h) { this._count++; }
}

hash.prototype = {
    count: function(){ return this.get("count"); },
    keys: function(){ return $.obj.keys(this.$h); },
    values: function(){ return $.obj.values(this.$h); },

    add: function(k, v) {
        if ((!($.isString(k) || $.isNumber(k))) || this.containsKey(k))
            throw new Error($.str.format("Invalid key: {0}. Must be unique number or string", k));
        this.$h[k] = v;
        this._count++;
        return this;
    },
    clear: function() {
        var h = this.$h;
        for (n in h) delete h[n];
        this._count = 0;
        return this;
    },
    find: function(k) {
        if (!$.exists(k)) return null;
        return this.$h[k];
    },
    findKey: function(v){
        var h = this.$h;
        for (n in h) if($.areEqual(h[n], v)) return n;
        return null;
    },
    findValue: function(k) { return this.find(k) },
    quit: function(){ this._iterator.quit(); return this;},
    each: function(f, s) {
        var scp = s || this;
        this._iterator = $.iterator(this.toObject());
        this._iterator.each(f, scp);
        return this;
    },
    isEmpty: function() { return this._count < 1; },
    containsKey: function(k) {
        if (!$.exists(k)) return false;
        return $.exists(this.$h[k]);
    },
    containsValue: function(v) {
        var values = $.obj.values(this.$h), i=values.length;
        while(i--) if($.areEqual(values[i], v)) return true;
        return false;
    },
    merge: function(obj){
        return hash_combine(this, obj, "merge");
    },
    meld: function(obj){
        return hash_combine(this, obj, "meld");
    },
    remove: function(k) {
        var h = this.$h;
        if (!$.exists(k)) return this;
        delete h[k];
        this._count--;
        return this;
    },
    replicate: function(){
        return $.hash($.replicate(this.$h));
    },
    toObject: function() { return this.$h; },
    update: function(k, v) {
        if(!$.exists(k)) return this;
        if(!this.containsKey(k)) this._count++;
        this.$h[k] = v;
        return this;
    }
}
$.Class.extend(hash, $.Class);

function hash_combine(hash, obj, m) {
    var o = (!obj.toObject) ? obj : obj.toObject();
    hash.$h = $.obj[m](o, hash.$h);
    hash._count = $.obj.count(hash.$h);
    return hash;
}

$.hash = function(obj){ return new hash(obj); }
$.hash.Class = hash;

function list(a) {
    list.base.call(this);
    this._keys = [];
    this._hash = $.hash();
    this._count = this._keys.length;
    
    if(!$.exists(a)) return;
    var i = 0, l = a.length;
    while(i < l) { this.add(a[i]); i++; }
}
list.prototype = {
    count: function(){ return this.get("count"); },
    add: function(item) {
        var k = this._keys, id = $.uid(); 
        k[k.length] = id;
        this._hash.add(id, item); 
        this._count = this._keys.length;
        return this;
    },
    clear: function() {
        this._hash.clear();
        this._keys = [];
        this._count = this._keys.length;
        return this;
    },
    contains: function(item) { return this._hash.containsValue(item); },
    find: function(index) {
        var k = this._keys;
        return ($.exists(k[index])) ? this._hash.find(k[index]) : null;
    },
    quit: function(){ this._iterator.quit(); return this;},
    each: function(f, s) {
        var scp = s || this;
        this._iterator = $.iterator(this.toArray());
        this._iterator.each(f, scp);
        return this;
    },
    isEmpty: function() { return this._count < 1; },
    remove: function(item) {
        var h = this._hash, k;
        if (!this.contains(item)) return this;
        
        k = h.findKey(item);
        this._keys.splice(k, 1);
        h.remove(k);
        this._count = h.count();
        return this;
    },
    toArray: function() {
        var value = [];
        this._hash.each(function(kv){ value.push(kv.value); });
        return value;
    }
}
$.Class.extend(list, $.Class);

$.list = function(a){ return new list(a); }
$.list.Class = list;
$.list.parseArguments = function(a){
    return new list(Array.prototype.slice.call(a));
}

function dayPoint(year, month, date, hours, minutes, seconds, milliseconds) {
    if ((month < 1) || (month > 12)) throw new Error("Invalid month at $.dayPoint");
    if ((date < 1) || (date > dayPoint_findDaysInMonth(month, year))) throw new Error("Invalid date at $.dayPoint");
    
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
    toDate: function() { return this.value(); },
    toJson: function() { return this.value().toJSON(); }
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

function money(amt, type) {
    if (isNaN(amt)) throw new Error($.str.format("$.money requires a number. Passed {0}", amt));
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
    if (!money.isOfType(other)) throw new Error("Invalid operation on non-conforming currencies.");
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

function coord(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw new Error($.str.format("at $.coord({0},{1}). Requires valid numbers.", x, y));

    coord.base.call(this);
    this.x(x).y(y);
}

coord.prototype = {
    x: function(x){ return this.property("x", x); },
    y: function(y){ return this.property("y", y); },
    abs: function(){
        return new coord(Math.abs(this._x), Math.abs(this._y));
    },
    add: function(other) {
        var x = this._x + other.x(),
            y = this._y + other.y();
        return new coord(x,y);
    },
    divide: function(other) {
        var x = this._x / other.x(),
            y = this._y / other.y();
        return new coord(x, y);
    },
    equals: function(other) {
        return (this._x === other.x()) && (this._y === other.y());
    },
    multiply: function(other) {
        var x = this._x * other.x(),
            y = this._y * other.y();
        return new coord(x, y);
    },
    subtract: function(other) {
        var x = this._x - other.x(),
            y = this._y - other.y();
        return new coord(x, y);
    },
    round: function(decimal){
        var d = decimal || 0;
        return new coord($.math.round(this.x(), d), $.math.round(this.y(), d));
    },
    half: function(){ return this.divide(new coord(2, 2)); },
    value: function() { return { x: this._x, y: this._y }; },
    toEm: function() { return coord_toUnit(this, "em"); },
    toPixel: function() { return coord_toUnit(this, "px"); },
    toString: function() { return $.str.format("({0},{1})", this._x, this._y); }
}
$.Class.extend(coord, $.Class);
$.coord = function(x, y) { return new coord(x, y); }
$.coord.Class = coord;

function coord_toUnit(coord, unit) {
    return {
        x: function() { return coord.x() + unit; },
        y: function() { return coord.y() + unit; }
    }
}
function coord_canParse(candidate){
    try{
        if (("left" in candidate) && ("top" in candidate))
            return !isNaN(candidate.left) && !isNaN(candidate.top);
        if (("width" in candidate) && ("height" in candidate))
            return !isNaN(candidate.width) && !isNaN(candidate.height);
        return false;
    }
    catch(e) { return false; }
}
function coord_parse(obj) {
    if (("left" in obj) && ("top" in obj)) return new coord(obj.left, obj.top);
    if (("width" in obj) && ("height" in obj)) return new coord(obj.width, obj.height);
    return null;
}

$.coord.zero = function(){ return new coord(0,0); }
$.coord.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random(seedy);
    return new coord(x, y);
}
$.coord.canParse = coord_parse;
$.coord.parse = coord_parse;
$.coord.tryParse = function(o){ return coord_canParse(o) ? coord_parse(o) : null; }

function point(x, y) {
    point.base.call(this, x, y);
}

point.prototype = {
    isAbove: function(other) { return this.y() < other.y(); },
    isBelow: function(other) { return this.y() > other.y(); },
    isLeftOf: function(other) { return this.x() < other.x(); },
    isRightOf: function(other) { return this.x() > other.x(); },
    distanceFrom: function(other) { return $.vector(this.x() - other.x(), this.y() - other.y()); },
    distanceTo: function(other) { return this.distanceFrom(other).invert(); }
}
$.Class.extend(point, $.coord.Class);

$.point = function(x, y) { return new point(x, y); }
$.point.Class = point;

$.point.zero = function(){ return new point(0,0); }
$.point.canParse = point_canParse;
$.point.parse = point_parse;
$.point.tryParse = function(candidate){ return point_canParse(candidate) ? point_parse(candidate) : null; }

function point_canParse(candidate){
    try { return !isNaN(candidate.x()) && !isNaN(candidate.y()); }
    catch(e) { return false; }
}
function point_parse(obj) { return new point(obj.x(), obj.y()); }

function rectangle (topLeft, dims){
    rectangle.base.call(this);
    this._topLeft = $.point.parse(topLeft);
    this._dims = $.point.parse(dims);
    this._bottomRight = $.point.parse(topLeft.add(dims));
}
rectangle.prototype = {
    dims: function() { return this.get("dims"); },
    topLeft: function() { return this.get("topLeft"); },
    bottomRight: function() { return this.get("bottomRight"); },
    center: function() { return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half(); },
    contains: function(coord) {
        var t = this._topLeft,
            b = this._bottomRight;

        return t.isAbove(coord) &&
            t.isLeftOf(coord) &&
            b.isRightOf(coord) &&
            b.isBelow(coord);
    }
}
$.Class.extend(rectangle, $.Class);
$.rectangle = function(topLeft, bottomRight){ return new rectangle(topLeft, bottomRight); }

function vector(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw new Error($.str.format("at $.vector({0},{1})", x, y));
    
    vector.base.call(this, x, y);
    
    this._lengthSquared = vector_calculateLengthSquared(this, x, y);
    this._length = vector_calculateLength(this, this._lengthSquared);
    this._unitNormalX = vector_calculateUnitNormal(this, x);
    this._unitNormalY = vector_calculateUnitNormal(this, y);
}

vector.prototype = {
    magnitude: function(){ return this.get("length"); },
    equals: function(other) {
        return (other instanceof vector) &&
            ((this._x === other.x()) && (this._y === other.y()));
    },
    normal: function() { return $.vector(this._unitNormalX, this._unitNormalY); },
    invert: function() { return $.vector(this.x() * -1, this.y() * -1); },
    norm: function() { return $.vector(Math.abs(this.x()), Math.abs(this.y())); },
    perpendicular: function(){ return $.vector(this.y() * -1, this.x()); },
    isZero: function() { return this.x() == 0 && this.y() == 0; },
    add: function(vector) { return $.vector(this.x() + vector.x(), this.y() + vector.y()); },
    dot: function(vector) { return (this.x() * vector.x()) + (this.y() * vector.y()); },
    perpendicularAtTo: function(vector) {
        var p = vector.add(this.projectionOfOnto(vector).invert());
        return $.vector(p.x(), p.y());
    },
    projectionOfOnto: function(vector) {
        var p = vector.normal().scale(this.dot(vector.normal()));
        return $.vector(p.x(), p.y());
    },
    scale: function(scalar) {
        return $.vector((this.x() * scalar), (this.y() * scalar));
    },
    unitNormalDot: function(vector) {
        return (this.normal().x() * vector.normal().x()) +
                (this.normal().y() * vector.normal().y());
    },
    reflect: function(incident){
        if(incident.isZero()) return this;
        var inorm = incident.normal()
        return this.add(inorm.scale(2*(inorm.dot(this))).invert());
    },
    round: function(decimal){
        var d = decimal || 0;
        return $.vector($.math.round(this.x(), d), $.math.round(this.y(), d));
    }
}
$.Class.extend(vector, $.coord.Class);

$.vector = function(x, y) { return new vector(x, y); }
$.vector.Class = vector;
$.vector.zero = function() { return $.vector(0,0); }
$.vector.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random();
    return $.vector(x, y);
}

function vector_calculateLength (v, lengthSquared) {
    if (v.isZero()) return 0;
    return Math.sqrt(lengthSquared);
}
function vector_calculateLengthSquared(v, x, y) {
    if (v.isZero()) return 0;
    return Math.pow(x, 2) + Math.pow(y, 2)
}
function vector_calculateUnitNormal (v, scalar) {
   if (v.isZero()) return 0;
   return scalar / v.magnitude();
}

$.abstractContext = function(state) {
    $.abstractContext.base.call(this);
    this.state(state);
}
$.abstractContext.prototype = {
    state: function(state) {
        if(!$.exists(state)) return this._state;
        return this.set("state", state.context(this));
    }
}
$.Class.extend($.abstractContext, $.Class);

$.abstractState = function(states) {
    $.abstractState.base.call(this);
    this.states(states);
}
$.abstractState.prototype = {
    context: function(context) { return this.property("context", context); },
    states: function(states) { return this.set("states", states); },
    state: function(state) {
        var c = this._context;
        c.state(new this._states[state](c));
        return this;
    }
}
$.Class.extend($.abstractState, $.Class);

$.abstractVisitor = function() { }
$.abstractVisitor.prototype = {
    $visit: function(){ throw new Error("visit method is abstract an must be defined."); },
    subject: function(subject) { return this.property("subject", $.replicate(subject)); },
    visit: function() { return this.$visit(); }
}

function iterator(subject) {
    iterator.base.call(this);
    this.$current = 0;
    this._quit = false; 
    this.subject(subject);
}
iterator.prototype = {
    $hasNext: function() { return $.exists(this._subject[this.$current + 1]); },
    $hasPrev: function() { return $.exists(this._subject[this.$current - 1]); },
    $each: function(func, scp) {
        var s = scp || this;
            this.reset();
        do { func.call(s, this.current()); }
        while (this.next() && (!this._quit));
        this._end = false;
        this.reset();
    },
    $exec: function(n) {
        var s = this._subject, o = s[n];
        if (!$.exists(o)) return null;
        this.$current = n;
        return o;
    },
    subject: function(subject) {
        var subj =
             ($.isArray(subject)) ? subject
            :($.isObject(subject)) ? iterator_createKvArray(subject)
            : subject;
        
        if(!$.isUndefined(subject)) this.reset();
        this.$subject = subj;
        return this.property("subject", subj);
    },
    current: function() { return this.$exec(this.$current); },
    next: function() { return this.$exec(this.$current + 1); },
    prev: function() { return this.$exec(this.$current - 1); },
    hasNext: function() { return this.$hasNext(); },
    hasPrev: function() { return this.$hasPrev(); },
    reset: function() { this.$current = 0; return this;},
    
    quit: function(){ return this.set("quit", true); },
    each: function(func, scp) {
        if (this._subject.length < 1) return this;
        this.$each(func, scp);
        return this;
    }
}
function iterator_createKvArray (obj) {
    var array = [];
    for(n in obj) array.push({"key":n, "value":obj[n]});
    return array;
}
$.Class.extend(iterator, $.Class);
$.iterator = function(subject){ return new iterator(subject); }
$.iterator.Class = iterator;

function mediator() {
    mediator.base.call(this);
    this._observers = $.hash();
}
mediator.prototype = {
    subscribe: function(name, method, scope, id) {
        var observers = this._observers;
        if(observers.containsKey(name)) observers.find(name).add(method, scope, id);
        else observers.add(name, $.observer().add(method, scope, id));
        return this;
    },
    unsubscribe: function(name, id) {
        var observers = this._observers;
        if(observers.containsKey(name)) observers.find(name).remove(id);
        return this;
    },
    notify: function() {
        var args = $.list.parseArguments(arguments),
            firstArg = args.find(0),
            isFirstArgData = !this._observers.containsKey(firstArg),
            isFilteredCall = !isFirstArgData || (args.count() > 1),
            data = isFirstArgData ? firstArg : null,
            nameList = isFirstArgData ? args.remove(firstArg) : args;
        console.log()
        return (isFilteredCall)
            ? this._notify(data, nameList)
            : this._notifyAll(data);
    },
    clear: function(){
        this._observers
            .each(function(o){ o.value.clear(); })
            .clear();
        return this;
    },
    isEmpty: function(){
        return this._observers.isEmpty();
    },
    _notifyAll: function(data){
        $.list(this._observers.values()).each(function(observer){ observer.notify(data); });
        return this;
    },
    _notify: function(data, list) {
        var o = this._observers;
        list.each(function(name){
            try { o.find(name).notify(data); }
            catch(e){ throw new Error($.str.format("{0}: {1}", e.message, name)); }
        });
        return this;
    }
}
$.Class.extend(mediator, $.Class);
$.mediator = function() { return new mediator(); }
$.mediator.Class = mediator;

function observer() {
    observer.base.call(this);
    this._methods = new $.hash();
}
observer.prototype = { 
    add: function(method, scope, id) {
        var mid = id || $.uid("observerMethod"), scp = scope || this;
        this._methods.add(mid, { m: method, s: scp });
        return this;
    },
    remove: function(id) {
        this._methods.remove(id);
        return this;
    },
    clear: function(){
        this._methods.clear();
        return this;
    },
    notify: function() {
        var it = new $.iterator(this._methods.values()), args = arguments;
        it.each(function(subscriber) {
            if(!$.exists(subscriber.m)) throw new Error($.str("Invalid function: {0} in observer."));
            subscriber.m.apply(subscriber.s, args);
        });
        return this;
    },
    isEmpty: function(){ return this._methods.isEmpty(); }
}
$.Class.extend(observer, $.Class);
$.observer = function() { return new observer(); }
$.observer.Class = observer

function queue() {
    this._q = [];
}
queue.prototype = {
    isEmpty: function() { return this._q.length == 0; },
    enqueue: function(item) {
        var q = this._q;
        q[q.length] = item;
        return this;
    },
    dequeue: function() {
        var q = this._q,
            item = q[0];
        q.splice(0,1);
        return item;
    },
    clear: function() { this._q = []; }
}
$.queue = function(){ return new queue(); }
$.queue.Class = queue;

function rolodex(subj) {
    rolodex.base.call(this, subj);
}
rolodex.prototype = {
    $hasNext: function() {
	var s = this.$subject,
	    l = s.length - 1,
	    c = this.$current,
	    n = c + 1,
	    t = (n > l) ? 0 : n;
	return $.exists(s[t]);
    },
    $hasPrev: function() {
        var s = this.$subject,
	    l = s.length - 1,
	    c = this.$current,
	    n = c + 1,
	    t = (n < 0) ? l : n;
	return $.exists(s[t]);
    },
    $each: function(func, scp) {
	var s = scp || this; this.reset();
	do { func.call(scp, this.current()); } 
	    while (this.next() && (this.$current > 0)); this.reset();
    },
    $exec: function(n) {
	var s = this.$subject, l = (s.length - 1);
	this.$current = (n > l) ? 0 : ((n < 0) ? l : n);
	return s[this.$current];
    }
}
$.Class.extend(rolodex, $.iterator.Class);
$.rolodex = function(subj){ return new rolodex(subj); }
$.rolodex.Class = rolodex;

function abstractSpec() { }
abstractSpec.prototype = {
    $isSatisfiedBy: function(v) { return; },
    isSatisfiedBy: function(v) {return this.$isSatisfiedBy(v);},
    and: function(spec) { return new andSpec(this, spec); },
    or: function(spec) { return new orSpec(this, spec); },
    xor: function(spec) { return new xorSpec(this, spec); },
    not: function() { return new notSpec(this); }
}
function andSpec (a, b) {
    andSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
andSpec.prototype.$isSatisfiedBy = function(c) {
    return this.$1.isSatisfiedBy(c) &&
            this.$2.isSatisfiedBy(c);
}
$.Class.extend(andSpec, abstractSpec);

function orSpec(a, b) {
    orSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
orSpec.prototype.$isSatisfiedBy = function(candidate) {
    return this.$1.isSatisfiedBy(candidate) ||
            this.$2.isSatisfiedBy(candidate);
}

$.Class.extend(orSpec, abstractSpec);

function xorSpec(a, b) {
    xorSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
xorSpec.prototype.$isSatisfiedBy = function(candidate) {
    return $.xor(this.$1.isSatisfiedBy(candidate),
                 this.$2.isSatisfiedBy(candidate));
}
$.Class.extend(xorSpec, abstractSpec);

function trueSpec() { trueSpec.base.call(this); }
trueSpec.prototype.$isSatisfiedBy = function(candidate) { return true; }
$.Class.extend(trueSpec, abstractSpec);

function falseSpec() { falseSpec.base.call(this); }
falseSpec.prototype.$isSatisfiedBy = function(candidate) { return false; }
$.Class.extend(falseSpec, abstractSpec);

function notSpec(s) {
    notSpec.base.call(this);
    this._s = s;
}
notSpec.prototype.$isSatisfiedBy = function(candidate) {
    return !this._s.isSatisfiedBy(candidate);
}
$.Class.extend(notSpec, abstractSpec);

function spec(func){
    spec.base.call(this);
    this.$isSatisfiedBy = func;
}
$.Class.extend(spec, abstractSpec);

$.spec = function(func){
    return new spec(func);
}

function stack() {
    this._q = [];
}
stack.prototype = {
    isEmpty: function() { return this._q.length == 0; },
    push: function(item) {
        var q = this._q;
        q[q.length] = item;
        return this;
    },
    pop: function() {
        return this._q.pop();
    },
    clear: function() { this._q = []; }
}
$.stack = function(){ return new stack(); }
$.stack.Class = stack;

})(jQuery);
