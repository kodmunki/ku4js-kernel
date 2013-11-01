if(!$.exists($.str)) $.str = { }
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