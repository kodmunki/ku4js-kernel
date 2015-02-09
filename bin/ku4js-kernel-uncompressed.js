(function(l){
function storeAuthorInfo() {
    $.ku4 = {
        'author': 'kodmunki\u2122',
        'license': 'The MIT License (MIT)' +
                   '\n\nCopyright (c) 2013 kodmunki\u2122.' +
                   '\nPermission is hereby granted, free of charge, to any person obtaining a copy of' +
                   '\nthis software and associated documentation files (the "Software"), to deal in' +
                   '\nthe Software without restriction, including without limitation the rights to' +
                   '\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of' +
                   '\nthe Software, and to permit persons to whom the Software is furnished to do so,' +
                   '\nsubject to the following conditions:' +
                   '\n\nThe above copyright notice and this permission notice shall be included in all' +
                   '\ncopies or substantial portions of the Software.' +
                   '\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR' +
                   '\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS' +
                   '\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR' +
                   '\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER' +
                   '\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN' +
                   '\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
    };
}
try {
    storeAuthorInfo();
}
catch(e) {
    $ = {};
    storeAuthorInfo();
}

$.isArray = function(x) { return x instanceof Array; };
$.isBool = function(x) { return (/boolean/i.test(typeof (x))); };
$.isDate = function(x) { return x instanceof Date; };
$.isEvent = function(x) { try { return x instanceof Event; } catch(e){ return x === window.event; }};
$.isNumber = function(x) { return ((/number/i.test(typeof (x))) || x instanceof Number) && !isNaN(x); };
$.isObject = function(x) { return $.exists(x) && (/object/i.test(typeof (x))) &&
                                  !($.isBool(x) || $.isNumber(x) || $.isDate(x) || $.isArray(x) || $.isString(x) || $.isFunction(x)); };
$.isObjectLiteral = function(x) { return $.isObject(x) && x.constructor == ({}).constructor };
$.isFunction = function(x) { return (x instanceof Function); };
$.isString = function(x) { return (/string/i.test(typeof (x))) || x instanceof String; };
$.isZero = function(n) { return n === 0; };
$.isEven = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : n % 2 === 0)); };
$.isOdd = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : !$.isEven(n))); };
$.isNull = function(x) { return x === null; };
$.isUndefined = function(x) { return typeof (x) == "undefined"; };
$.isEmpty = function(s) { return $.isString(s) && $.isZero(s.split(/\B/).length); };
$.isNullOrEmpty = function(s) { return !$.exists(s) || $.isEmpty(s); };
$.exists = function(x) { return (x !== null) && (!$.isUndefined(x)); };
$.areEqual = function(value1, value2) {
    if(this.exists(value1) && this.exists(value2)) {
        if(this.exists(value1.equals) && value1.equals(value2)) return true;
        if(this.exists(value1.getTime) && this.exists(value2.getTime) && value1.getTime() == value2.getTime()) return true;
        if(value1 === value2) return true;
        else return value1 === value2;
    }
    else return value1 === value2;
};
$.xor = function(a, b) { return !a != !b; };

function exception(className, message, browserTrace, ku4Trace){
    var format = "ku4EXCEPTION @ {0}: {1}\n\nBrowser Stack Trace:\n{2}\n\nku4Trace:\n{3}";
    return new Error($.str.format(format, className.toUpperCase(), message, browserTrace, ku4Trace));
}

$.ku4exception = function(className, message) {
    var caller = arguments.callee.caller,
        ku4Trace = "",
        browserTrace = "";
        
        (function(){
            try{ generate.exeception; }
            catch(e){
                browserTrace = ($.exists(e.stack)) ? e.stack.replace(/generate is.+/, ""): "[Unavailable]";
                var i = 0, method, m;
                while(caller && (i < 10)){
                    method = caller.toString().replace(/[\n\t\r\s]+/g, " ").substring(0, 100);
                    m = method
                        .replace(/\W/g, "a")
                        .replace(/\s/g, "")
                        .replace(/.*base\.js:216/, "")
                        .split(/\B/)
                        .length > 99
                            ? method + "..."
                            : method;
                    ku4Trace += $.str.format("<ku4Idx[{0}]>:{1}\n", i, m);
                    caller = caller.caller;
                    i++;
                }
            }
        })();
    return exception(className, message, browserTrace, ku4Trace);
}

$.ku4Log = function(){
    try { console.log.apply(console, arguments); }
    catch(e){ alert(Array.prototype.slice.call(arguments).join("\n")); }
}

/*
//IE
LOG: message 
LOG: description 
LOG: number 
LOG: name 
 
//firefox
fileName
lineNumber
 
//Safari
message
line
sourceId
expressionBeginOffset
expressionCaretOffset
expressionEndOffset
name
*/

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

if(!$.exists($.obj)) $.obj = { };
$.obj.keys = function(o) {
    var r = [];
    for (n in o) r[r.length] = n;
    return r;
};
$.obj.values = function(o) {
    var r = [];
    for (n in o) r[r.length] = o[n];
    return r;
};
$.obj.count = function(o){
    var c = 0;
    for(n in o) c++;
    return c;
};
$.obj.hasProp = function(obj, prop){
    return ($.exists(obj.hasOwnProperty))
        ? obj.hasOwnProperty(prop)
        : false;
};
$.obj.merge = function(obj1, obj2){
    var mergee = $.replicate(obj2);
    for (n in obj1) mergee[n] = obj1[n];
    return mergee;
};
$.obj.meld = function(obj1, obj2){
    var meldee = $.replicate(obj2);
    for (n in obj1) {
        if($.exists(meldee[n])) continue;
        meldee[n] = obj1[n];
    }
    return meldee;
};
$.obj.filter = function(/*obj, keys...*/) {
    var args = Array.prototype.slice.call(arguments),
        value = {},
        obj = args[0],
        keys = args.slice(1);

    for (var n in keys) {
        var key = keys[n];
        value[key] = obj[key];
    }

    return value;
};

if(!$.exists($.arr)) $.arr = { };
$.arr.indexOfRegExp = function(array, regexp) {
    for (n in array) {
        var value = array[n];
        if(regexp.test(array[n])) return n;
    }
    return -1;
};

$.Class = function(){ }
$.Class.prototype = {
    get: function(p){ return this["_"+p]; },
    set: function(p, v){ this["_"+p] = v; return this; },
    property: function(p, v){
        return ($.isUndefined(v))
            ? this.get(p)
            : this.set(p, v);
    }
};

$.Class.extend = function(sub, sup) {
    if(!sub || !sup) return null;
    var proto = function() { };
    proto.prototype = sup.prototype;
    sub.base = sup;
    sub.prototype = $.obj.merge(sub.prototype, new proto());
    sub.prototype.constructor = sub;
    return sub;
};

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

if(!$.exists($.math)) $.math = { };
$.math.round = function(n, d){
    var p = d || 0,
        m = Math.pow(10, -p);
    return Math.round(parseFloat((n * m).toFixed(Math.abs(p)))) / m;
};
$.math.roundUp = function(n, d){
    var p = d || 0,
        r = 5 * (Math.pow(10, p - 1));
    return $.math.round(n + r, d);
};
$.math.roundDown = function(n, d){
    if(n === 0) return 0;
    var p = d || 0,
        r = 5 * (Math.pow(10, p - 1));
    return $.math.round(n - r, d);
};
$.math.roundTowardZero = function(n, d) {
    return (n < 0) ? $.math.roundUp(n, d) : $.math.roundDown(n, d);
};
$.math.factorial = function(n){
    var v = n, i = n;
    while(i--) if(!!i) v *= i;
    return v;
};
$.math.divide = function(a, b){
    var isValid = $.isNumber(a) && $.isNumber(b) && !$.isZero(b);
    if(!isValid) throw $.ku4exception("$.math", $.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}", a, b, typeof a, typeof b));
    return a / b;
};
$.math.gcd = function(a, b) {
    return (b == 0) ? Math.abs(a) : $.math.gcd(b, a % b);
};

if(!$.exists($.str)) $.str = { };
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
$.str.build = function() {
    return "".concat.apply(new String(), arguments);
};
$.str.format = function() {
    var a = arguments, s = a[0], l = a.length,  A, S;
    for (i = 1; i < l; i++) {
        A = a[i];
        S = ($.isNull(A)) ? "null" : ($.isUndefined(A)) ? "undefined" : A.toString();
        s = s.replace(RegExp("\\{" + (i - 1) + "\\}", "g"), S);
    }
    return s;
};
$.str.render = function(template, obj, alt) {
    var s = "" + template;
    for (var n in obj) {
        s = s.replace(RegExp("\\{{" + n + "\\}}", "g"), obj[n]);
    }
    return $.exists(alt) ? s.replace(/\{\{.*\}\}/g, alt) : s;
};
$.str.replaceCharsAtIndex = function(s, index, length, value) {
    if($.isNullOrEmpty(s) || index < 0 || index > s.length || $.isNullOrEmpty(value))
        throw $.ku4exception("Argument Exception", "Invalid arguments at $.str.replaceStringAtIndex");
    return s.substring(0, index) + value + s.substring(index + length);
};
$.str.parse = function(){
    return String.fromCharCode.apply(String, arguments);
};
$.str.trim = function(s) {
    return $.str.trimStart($.str.trimEnd(s));
};
$.str.trimStart = function(s) {
    if(!$.isString(s)) throw new Error("Cannot trim non-string values");
    return ($.exists(s.replace))
        ? s.replace(/^\s*\b/, "") : s;
};
$.str.trimEnd = function(s) {
    if(!$.isString(s)) throw new Error("Cannot trim non-string values");
    return ($.exists(s.replace))
        ? s.replace(/\b\s*$/, "") : s;
};
$.str.encodeBase64 = function(strng) {
    if(!$.isString(strng)) throw $.ku4exception("str", "Cannot base64 encode non-string value.");

    try { return btoa(strng); }
    catch(e) {
        var value = "", i = 0, s = $.str.encodeUtf8(strng),
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            code = function (n) {
                return s.charCodeAt(n);
            },
            chr = function (enc) {
                return chars.charAt(enc)
            };

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
};
$.str.decodeBase64 = function(strng) {
    if(!$.isString(strng)) throw $.ku4exception("str", "Cannot base64 encode non-string value.");

    try { return atob(strng); }
    catch(e) {
        var value = "", i = 0, s = strng.replace(/[^A-Za-z0-9\+\/\=]/g, ""),
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            enc = function (n) {
                return chars.indexOf(s.charAt(n));
            },
            chr = function (code) {
                return String.fromCharCode(code);
            };

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
};
$.str.encodeUtf8 = function(strng) {
    var value = "", s = strng.replace(/\r\n/g,"\n");

    function code(n) { return s.charCodeAt(n); }
    function chr(code) { return String.fromCharCode(code); }

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
};
$.str.decodeUtf8 = function(strng) {
    var value = "", i = 0, c = 0, c1 = 0, c2 = 0, s = strng;

    function code(n) { return s.charCodeAt(n); }
    function chr(code) { return String.fromCharCode(code); }

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
};

$.uid = function() {
	var a = Math.random().toString().replace(/\b\.\b/, ""),
	    b = Math.random().toString().replace(/\b\.\b/, "");
	return $.str.encodeBase64($.str.format("{0}x{1}", a, b)).replace(/=+/g,"0").substr(3,32);
};

function emailAddress(local, domain, topLevelDomain) {
    emailAddress.base.call(this);
    this._local = local;
    this._domain = domain;
    this._topLevelDomain = topLevelDomain;
}
emailAddress.prototype = {
    local: function(){ return this._local; },
    domain: function(){ return this._domain; },
    topLevelDomain: function(){ return this._topLevelDomain; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.local() == this._local &&
                other.domain().toUpperCase() == this._domain.toUpperCase() &&
                other.topLevelDomain().toUpperCase() == this._topLevelDomain.toUpperCase();
    },
    toString: function() {
        return $.str.format("{0}@{1}.{2}", this._local, this._domain, this._topLevelDomain);
    }
};
$.Class.extend(emailAddress, $.Class);

$.emailAddress = function(local, domain, topLevelDomain) {
    return new emailAddress(local, domain, topLevelDomain);
};
$.emailAddress.Class = emailAddress;

$.emailAddress.parse = function(str){
    if (!($.exists(str)) && /@{1}/.test(str)) return null;

    var splitOnAt = str.split("@"),
        lastPart = splitOnAt[1],
        split = lastPart.split("."),
        local = splitOnAt[0],
        topLevelDomain = split.splice(split.length-1, 1),
        domain = split.join(".");

    return new emailAddress(local, domain, topLevelDomain);
};

function phoneNumber(number) {
    phoneNumber.base.call(this);
    this._value = number;
}
phoneNumber.prototype = {
    value: function() { return this._value; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return other.value() == this._value;
    },
    toStringWithFormat: function(format) {
        var formattedValue = format;
        $.list((this._value.toString().split(""))).each(function(number){
            formattedValue = formattedValue.replace("#", number);
        });
        return formattedValue.replace(/#/g, "");
    }
};
$.Class.extend(phoneNumber, $.Class);

$.phoneNumber = function(number){ return new phoneNumber(number); };
$.phoneNumber.Class = phoneNumber;

$.phoneNumber.parse = function(str) {
    return new phoneNumber(parseInt(str.replace(/[^0-9]/gi, "")));
};

function properName(first, middle, last) {
    properName.base.call(this);
    this._first = first;
    this._middle = middle || "";
    this._last = last;
}
properName.prototype = {
    first: function(){ return this._first; },
    middle: function(){ return this._middle; },
    last: function(){ return this._last; },
    full: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{F} {L}" : "{F} {M} {L}";
        return this.toStringWithFormat(format);
    },
    initials: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{f}.{l}." : "{f}.{m}.{l}.";
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
};
$.Class.extend(properName, $.Class);

$.properName = function(first, middle, last) { return new properName(first, middle, last); }
$.properName.Class = properName;

function hash(obj) {
    hash.base.call(this);

    this.$h = {};
    this._count = 0;

    var o = ($.exists(obj) && $.exists(obj.toObject)) ? obj.toObject() : obj;
    for(var n in o) this.add(n, o[n]);
}

hash.prototype = {
    count: function(){ return this.get("count"); },
    keys: function(){ return $.obj.keys(this.$h); },
    values: function(){ return $.obj.values(this.$h); },
    add: function(k, v) {
        if ((!($.isString(k) || $.isNumber(k))) ||
            /(^null$)|(^undefined$)/.test(k)
            || this.containsKey(k))
            throw $.ku4exception("$.hash", $.str.format("Invalid key: {0}. Must be unique number or string.", k));

        if($.isUndefined(v)) return this;
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
    contains: function(other) {
        if(!$.exists(other) || $.isNullOrEmpty(other) || $.hash(other).isEmpty()) return false;
        var test = $.exists(other.toObject) ? other : $.hash(other),
            contains = true;
        test.each(function(obj) {
            if(!$.exists(obj)) { contains = false; test.quit(); }
            else {
                var key = obj.key;
                contains = this.containsKey(key) && $.areEqual(this.findValue(key), obj.value);
                if(!contains) test.quit();
            }
        }, this);
        return contains;
    },
    containsKey: function(k) {
        if (!$.exists(k)) return false;
        return !$.isUndefined(this.$h[k]);
    },
    containsValue: function(v) {
        var values = $.obj.values(this.$h), i=values.length;
        while(i--) if($.areEqual(v, values[i])) return true;
        return false;
    },
    merge: function(obj){
        return hash_combine(this, obj, "merge");
    },
    meld: function(obj){
        return hash_combine(this, obj, "meld");
    },
    filter: function(/*keys*/) {
        var args = [this.$h].concat(Array.prototype.slice.call(arguments));
        return $.hash($.obj.filter.apply($.obj, args));
    },
    remove: function(k) {
        if (!this.containsKey(k)) return this;
        var h = this.$h;
        h[k] = "value";
        delete h[k];
        this._count--;
        return this;
    },
    replicate: function(){
        return $.hash($.replicate(this.$h));
    },
    toObject: function() { return this.$h; },
    update: function(k, v) {
        if ((!($.isString(k) || $.isNumber(k))) ||
            /(^null$)|(^undefined$)/.test(k))
            throw $.ku4exception("$.hash", $.str.format("Invalid key: {0}. Must be number or string.", k));

        if($.isUndefined(v)) return this;
        if(!this.containsKey(k)) this._count++;
        this.$h[k] = v;
        return this;
    }
};
$.Class.extend(hash, $.Class);

function hash_combine(hash, obj, m) {
    var o = ($.exists(obj) && $.exists(obj.toObject)) ? obj.toObject() : obj;
    hash.$h = $.obj[m](o, hash.$h);
    hash._count = $.obj.count(hash.$h);
    return hash;
}

$.hash = function(obj){ return new hash(obj); };
$.hash.Class = hash;

function list(a) {
    list.base.call(this);
    this._keys = [];
    this._hash = $.hash();
    this._count = this._keys.length;
    
    if(!$.exists(a)) return;
    var i = 0, l = a.length;
    while(i < l) {
        var v = a[i];
        if(!$.isUndefined(v)) this.add(v);
        i++;
    }
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
        var h = this._hash;
        if (!this.contains(item)) return this;
        var k = h.findKey(item);
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
};
$.Class.extend(list, $.Class);

$.list = function(a){ return new list(a); }
$.list.Class = list;
$.list.parseArguments = function(a){
    return new list(Array.prototype.slice.call(a));
};

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

    var v = ($.isString(value) && /^\d{4}\-\d{,12}\-\d{1,2}$/.test($.str.trim(value)))
                ? value.replace(/(?:\D)(0)/g,"-").replace(/^0/,"")
                : value;

    if(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(v)) {
        var components = v.split("-"),
            component0 = components[0];
        components.push(component0);
        components.shift();
        v = components.join("/");
    }

    var D = new Date(v);

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
            format = (money.isLessThan($.money.zero(this.currency()))) ? "({0}{1}{2}{3})" : "{0}{1}{2}{3}",
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
    if (/^\d$/.test(_cents)) return _cents + "0";
    return _cents;
}

function coord(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw $.ku4exception("$.coord", $.str.format("Invalid arguments x= {0}, y= {1} ", x, y));

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
};
$.Class.extend(coord, $.Class);
$.coord = function(x, y) { return new coord(x, y); };
$.coord.Class = coord;
$.coord.isInstance = function(other) { return other instanceof coord; };

function coord_toUnit(coord, unit) {
    return {
        x: function() { return coord.x() + unit; },
        y: function() { return coord.y() + unit; }
    }
}
function coord_canParse(candidate){
    try{
        if ($.isArray(candidate)) return !(isNaN(candidate[0]) || isNaN(candidate[1]));
        if ($.isObjectLiteral(candidate)) {
            if (("x" in candidate) && ("y" in candidate))
                return !(isNaN(candidate.x) || isNaN(candidate.y));
            if (("left" in candidate) && ("top" in candidate))
                return !(isNaN(candidate.left) || isNaN(candidate.top));
            if (("width" in candidate) && ("height" in candidate))
                return !(isNaN(candidate.width) || isNaN(candidate.height));
        }
        return $.coord.isInstance(candidate);
    }
    catch(e) { return false; }
}
function coord_parse(obj) {
    if (!$.exists(obj)) return null;
    if ($.coord.isInstance(obj)) return obj;
    if ($.isArray(obj)) return new coord(obj[0], obj[1]);
    if ($.isObjectLiteral(obj)) {
        if ($.exists(obj.left) && $.exists(obj.top)) return new coord(obj.left, obj.top);
        if ($.exists(obj.width) && $.exists(obj.height)) return new coord(obj.width, obj.height);
        if ($.exists(obj.x) && $.exists(obj.y)) return new coord(obj.x, obj.y);
    }
    return null;
}

$.coord.zero = function(){ return new coord(0,  0); };
$.coord.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random(seedy);
    return new coord(x, y);
}
$.coord.canParse = coord_canParse;
$.coord.parse = coord_parse;
$.coord.tryParse = function(o){ return coord_canParse(o) ? coord_parse(o) : null; };

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
};
$.Class.extend(point, $.coord.Class);

$.point = function(x, y) { return new point(x, y); };
$.point.Class = point;
$.point.isInstance = function(other) { return other instanceof point; };

$.point.zero = function(){ return new point(0,0); };
$.point.canParse = point_canParse;
$.point.parse = point_parse;
$.point.tryParse = function(candidate){ return point_canParse(candidate) ? point_parse(candidate) : null; };

function point_canParse(candidate){
    try { return  $.point.isInstance(point) || $.coord.canParse(candidate) }
    catch(e) { return false; }
}
function point_parse(obj) {
    if($.point.isInstance(obj)) return obj;
    var coord = $.coord.parse(obj);
    return new point(coord.x(), coord.y());
}

function rectangle (topLeft, dims){
    rectangle.base.call(this);
    this._topLeft = $.point.parse(topLeft);
    this._dims = $.point.parse(dims);
    this._bottomRight = $.point.parse(this._topLeft.add(this._dims));
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
    },
    aspectToFit: function(other) {
        var thisDims = this.dims(),
            otherDims = other.dims(),
            width = thisDims.x(),
            height = thisDims.y(),
            maxWidth = otherDims.x(),
            maxHeight = otherDims.y();

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        }
        else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        return new rectangle(this._topLeft, {width:width, height:height});
    }
};
$.Class.extend(rectangle, $.Class);
$.rectangle = function(topLeft, dims){ return new rectangle(topLeft, dims); };
$.rectangle.Class = rectangle;

function vector(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw $.ku4exception("$.vector", $.str.format("Invalid arguments x= {0}, y= {1} ", x, y));
    
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
        var inorm = incident.normal();
        return this.add(inorm.scale(2*(inorm.dot(this))).invert());
    },
    round: function(decimal){
        var d = decimal || 0;
        return $.vector($.math.round(this.x(), d), $.math.round(this.y(), d));
    }
};
$.Class.extend(vector, $.coord.Class);

$.vector = function(x, y) { return new vector(x, y); };
$.vector.Class = vector;
$.vector.zero = function() { return $.vector(0,0); };
$.vector.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random();
    return $.vector(x, y);
};

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

function fraction(numerator, denominator) {
    if (!$.isNumber(numerator) || !$.isNumber(denominator))
        throw $.ku4exception("$.fraction", $.str.format("Invalid arguments numerator= {0}, denominator= {1} ", numerator, denominator));

    this._numerator = numerator;
    this._denominator = denominator;
}
fraction.prototype = {
    numerator: function() {
        return this._numerator;
    },
    denominator: function() {
        return this._denominator;
    },
    value: function() {
        return this._numerator / this._denominator;
    },
    equals: function(other) {
        return this.value() == other.value();
    },
    add: function(other) {
        var commonDenominator = this.commonDenominator(other),
            fractionA = this.withDenominator(commonDenominator),
            fractionB = other.withDenominator(commonDenominator),
            numerator = fractionA.numerator() + fractionB.numerator();

        return new fraction(numerator, commonDenominator);
    },
    subtract: function(other) {
        var commonDenominator = this.commonDenominator(other),
            fractionA = this.withDenominator(commonDenominator),
            fractionB = other.withDenominator(commonDenominator),
            numerator = fractionA.numerator() - fractionB.numerator();

        return new fraction(numerator, commonDenominator);
    },
    multiply: function(other) {
        var numerator = this._numerator * other.numerator(),
            denominator = this._denominator * other.denominator();

        return new fraction(numerator, denominator);
    },
    divide: function(other) {
        return this.multiply(other.reciprocal());
    },
    reciprocal: function() {
        return new fraction(this._denominator, this._numerator);
    },
    commonDenominator: function(other) {
        return this._denominator * other.denominator();
    },
    withDenominator: function(value) {
        var numerator = (value / this._denominator) * this._numerator;

        return new fraction(numerator, value);
    },
    simplify: function() {
        var gcd = $.math.gcd(this._denominator, this._numerator);
        return new fraction(this._numerator / gcd, this._denominator / gcd);
    },
    toString: function() {
        return this._numerator + "/" + this._denominator;
    }
};
$.fraction = function(numerator, denominator) { return new fraction(numerator, denominator); };
$.fraction.isInstance = function(other) { return other instanceof fraction; };

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

function mediator(name) {
    mediator.base.call(this);
    this._name = name || $.uid();
    this._observers = $.hash();
    this._throwErrors = 0;
}
mediator.prototype = {
    throwErrors: function() { this._throwErrors = 2; return this; },
    logErrors: function() { this._throwErrors = 1; return this; },
    catchErrors: function() { this._throwErrors = 0; return this; },
    isEmpty: function(){ return this._observers.isEmpty(); },
    count: function() { return this._observers.count(); },
    activeSubscriptionKeys: function() { return this._observers.keys(); },
    subscribe: function(name, method, scope, id) {
        var observers = this._observers;

        if($.isNullOrEmpty(name)) throw $.ku4exception("$.mediator", "subscribe name must be a valid, non-empty string value.");
        if(!$.isFunction(method)) throw $.ku4exception("$.mediator", "subscribe method must be a valid function.");

        method.__ku4mediator_name__ = this._name;
        if(observers.containsKey(name)) observers.find(name).add(method, scope, id);
        else observers.add(name, $.observer(name).add(method, scope, id));
        return this;
    },
    unsubscribe: function(name, id) {
        var observers = this._observers;
        if(observers.containsKey(name)) observers.find(name).remove(id);
        return this;
    },
    notify: function() {
        var args = $.list.parseArguments(arguments),
            data = $.list(),
            nameList = $.list();

        args.each(function(arg) {
            if(this._observers.containsKey(arg)) nameList.add(arg);
            else data.add(arg);
        }, this);

        return (nameList.isEmpty())
            ? this._notifyAll(data.toArray())
            : this._notify(data.toArray(), nameList);
    },
    clear: function(){
        this._observers
            .each(function(o){ o.value.clear(); })
            .clear();
        return this;
    },
    _notifyAll: function(data){
        $.list(this._observers.values()).each(function(observer){ observer.notify.apply(observer, data); });
        return this;
    },
    _notify: function(data, list) {
        var o = this._observers,
            t = this._throwErrors,
            mediatorName = this._name;
        list.each(function(name){
            try {
                var observer = o.find(name);
                observer.notify.apply(observer, data);
            }
            catch(e) {
                var message = "This exception may be thrown for various reasons. BE SURE TO CHECK FOR:" +
                              "\n\n1) INFINITE LOOPS: Occur due to inadvertent unfiltered calls to notify." +
                              " Check calls to notify for inadvertent missing or misspelled filters." +
                              "\n\n2) SUBSCRIBER EXCEPTIONS: Occur due to exceptions thrown in a subscriber." +
                              " Check subscriber methods for uncaught exceptions." +
                              "\n\n*NOTE: For more information see the documentation at https://github.com/kodmunki/ku4js-kernel#mediator",

                    exception = $.ku4exception("$.mediator",
                        $.str.format("{0}. \n\Mediator name = {1}\nSubscriber name = {2}\n\n {3}\n", e.message, mediatorName, name, message));

                if(t == 2) throw exception;
                if(t == 1) $.ku4Log(exception.message);
            }
        });
        return this;
    }
};
$.Class.extend(mediator, $.Class);
$.mediator = function(name) { return new mediator(name); }
$.mediator.Class = mediator;

function observer(name) {
    observer.base.call(this);
    this._name = name || $.uid();
    this._methods = new $.hash();
}
observer.prototype = { 
    add: function(method, scope, id) {
        var mid = id || $.uid(),
            scp = scope || this;

        method.__ku4observer_name__ = this._name;
        method.__ku4observer_method_id__ = mid;

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
        var it = new $.iterator(this._methods.values()), args = arguments,
            name = this._name;
        it.each(function(subscriber) {
            var method = subscriber.m;
            if(!$.exists(method)) {
                throw $.ku4exception("$.observer", $.str.format("Attempt to call invalid or undefined method @ observer: {0}.\n", name));
            }
            else {
                try { method.apply(subscriber.s, args); }
                catch(e) {
                    throw $.ku4exception("$.observer", $.str.format("Error in subscribed method @ observer: {0} methodId: {1}.\nmessage:{2}\n\n", name, method.__ku4observer_method_id__, e.message));
                }
            }
        });
        return this;
    },
    isEmpty: function(){ return this._methods.isEmpty(); }
};
$.Class.extend(observer, $.Class);
$.observer = function(name) { return new observer(name); };
$.observer.Class = observer;

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
$.fifo = function(){ return new queue(); }
$.fifo.Class = queue;

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
$.lifo = function(){ return new stack(); }
$.lifo.Class = stack;

})();
