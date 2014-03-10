if(!$.exists($.obj)) $.obj = { };
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