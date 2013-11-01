function hash(obj) {
    hash.base.call(this);
    var o = (!$.exists(obj) || !obj.toObject) ? obj : obj.toObject();
    this.$h = ($.exists(o)) ? o : {};
    this._count = 0;
    for (n in this.$h) { this._count++; }
}

hash.prototype = {
    count: function(){ return this.get("count"); },
    add: function(k, v) {
        if (!$.exists(k) || this.containsKey(k)) return this;
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
        if (!$.exists(v)) return null;
        var h = this.$h;
        for (n in h) if(h[n] == v) return n;
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
    listKeys: function() {
        return new $.list($.obj.keys(this.$h));
    },
    listValues: function() {
        return new $.list($.obj.values(this.$h));
    },
    containsKey: function(k) {
        if (!$.exists(k)) return false;
        return $.exists(this.$h[k]);
    },
    containsValue: function(v) {
        var a = $.obj.values(this.$h), i = a.length;
        while(i--) { if(a[i] == v) return true; }
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
        if (!$.exists(k) || !$.exists(h[k])) return this;
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