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
        var value = this.$h[k];
        return ($.isUndefined(value)) ? null : value;
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