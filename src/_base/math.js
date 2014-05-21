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