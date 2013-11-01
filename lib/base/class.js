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