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
}
$.Class.extend(list, $.Class);

$.list = function(a){ return new list(a); }
$.list.Class = list;
$.list.parseArguments = function(a){
    return new list(Array.prototype.slice.call(a));
}