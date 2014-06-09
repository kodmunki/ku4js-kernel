$.isArray = function(x) { return x instanceof Array; };
$.isBool = function(x) { return (/boolean/i.test(typeof (x))); };
$.isDate = function(x) { return x instanceof Date; };
$.isEvent = function(x) { try { return x instanceof Event; } catch(e){ return x === window.event; }};
$.isNumber = function(x) { return ((/number/i.test(typeof (x))) || x instanceof Number) && !isNaN(x); };
$.isObject = function(x) { return $.exists(x) && (/object/i.test(typeof (x))) &&
                                  !($.isBool(x) || $.isNumber(x) || $.isDate(x) || $.isArray(x) || $.isString(x) ||  $.isFunction(x)); };
$.isObjectLiteral = function(x) { return $.isObject(x) && x.constructor == ({}).constructor },
$.isFunction = function(x) { return (x instanceof Function); };
$.isString = function(x) { return (/string/i.test(typeof (x))) || x instanceof String; };
$.isZero = function(n) { return n === 0; };
$.isEven = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : n % 2 === 0)); };
$.isOdd = function(n) { return ($.isNullOrEmpty(n) || $.isDate(n)) ? false : (isNaN(n) ? false : ($.isZero(n) ? false : !$.isEven(n))); };
$.isNull = function(x) { return x === null; };
$.isUndefined = function(x) { return (/undefined/i.test(typeof (x))); };
$.isEmpty = function(s) { return $.isString(s) && $.isZero(s.split(/\B/).length); };
$.isNullOrEmpty = function(s) { return !$.exists(s) || $.isEmpty(s); };
$.exists = function(x) { return (x !== null) && (!$.isUndefined(x)); };
$.areEqual = function(value1, value2) {
    if(this.exists(value1) && this.exists(value2)) {
        if(this.exists(value1.equals) && value.equals(value2)) return true;
        if(this.exists(value1.getTime) && this.exists(value2.getTime) && value1.getTime() == value2.getTime()) return true;
        if(value1 === value2) return true;
        else return value1 === value2;
    }
    else return value1 === value2;
};
$.xor = function(a, b) { return !a != !b; };