function iterator(subject) {
    iterator.base.call(this);
    this.$current = 0;
    this._quit = false; 
    this.subject(subject);
}
iterator.prototype = {
    $hasNext: function() { return $.exists(this._subject[this.$current + 1]); },
    $hasPrev: function() { return $.exists(this._subject[this.$current - 1]); },
    $each: function(func, scp) {
        var s = scp || this;
            this.reset();
        do { func.call(s, this.current()); }
        while (this.next() && (!this._quit));
        this._end = false;
        this.reset();
    },
    $exec: function(n) {
        var s = this._subject, o = s[n];
        if (!$.exists(o)) return null;
        this.$current = n;
        return o;
    },
    subject: function(subject) {
        var subj =
             ($.isArray(subject)) ? subject
            :($.isObject(subject)) ? iterator_createKvArray(subject)
            : subject;
        
        if(!$.isUndefined(subject)) this.reset();
        this.$subject = subj;
        return this.property("subject", subj);
    },
    current: function() { return this.$exec(this.$current); },
    next: function() { return this.$exec(this.$current + 1); },
    prev: function() { return this.$exec(this.$current - 1); },
    hasNext: function() { return this.$hasNext(); },
    hasPrev: function() { return this.$hasPrev(); },
    reset: function() { this.$current = 0; return this;},
    
    quit: function(){ return this.set("quit", true); },
    each: function(func, scp) {
        if (this._subject.length < 1) return this;
        this.$each(func, scp);
        return this;
    }
}
function iterator_createKvArray (obj) {
    var array = [];
    for(n in obj) array.push({"key":n, "value":obj[n]});
    return array;
}
$.Class.extend(iterator, $.Class);
$.iterator = function(subject){ return new iterator(subject); }
$.iterator.Class = iterator;