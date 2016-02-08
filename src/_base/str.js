if(!$.exists($.str)) $.str = { };
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
$.str.isNullOrEmpty = function(s) {
    return !$.exists(s) || ($.isString(s) && $.isEmpty(s));
};
$.str.contains = function(s, value) {
    return s.indexOf(value) > -1;
};
$.str.build = function() {
    return "".concat.apply(new String(), arguments);
};
$.str.format = function() {
    var a = arguments, s = a[0], l = a.length,  A, S;
    for (var i = 1; i < l; i++) {
        A = a[i];
        S = ($.isNull(A)) ? "null" : ($.isUndefined(A)) ? "undefined" : A.toString();
        s = s.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), S);
    }
    return s;
};
$.str.render = function(template, obj, alt) {
    var s = "" + template;
    for (var n in obj) {
        s = s.replace(new RegExp("\\{{" + n + "\\}}", "g"), obj[n]);
    }
    return $.exists(alt) ? s.replace(/\{\{[A-z0-9_]+\}\}/g, alt) : s;
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
        ? s.replace(/^[\s\n]*/, "") : s;
};
$.str.trimEnd = function(s) {
    if(!$.isString(s)) throw new Error("Cannot trim non-string values");
    return ($.exists(s.replace))
        ? s.replace(/[\s\n]*$/, "") : s;
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