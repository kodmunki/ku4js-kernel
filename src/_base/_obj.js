if(!$.exists($.obj)) $.obj = { };
$.obj.keys = function(o) {
    var r = [];
    for (var n in o) r[r.length] = n;
    return r;
};
$.obj.values = function(o) {
    var r = [];
    for (var n in o) r[r.length] = o[n];
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
$.obj.ownProp = function(obj, prop){
    return ($.obj.hasProp(obj, prop)) ? obj[prop] : undefined;
};
$.obj.merge = function(obj1, obj2){
    var mergee = $.replicate(obj2);
    for (var n in obj1) mergee[n] = obj1[n];
    return mergee;
};
$.obj.meld = function(obj1, obj2){
    var meldee = $.replicate(obj2);
    for (var n in obj1) {
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
$.obj.areEqual = function(obj1, obj2) {
    var keys1 = $.obj.keys(obj1),
        keys2 = $.obj.keys(obj2);

    if(!($.exists(obj1) && $.exists(obj2))) return false;
    if(keys1.length != keys2.length) return false;
    for(var n in obj1) if(!$.areEqual(obj1[n], obj2[n])) return false;
    return true;
};