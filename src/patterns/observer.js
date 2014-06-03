function observer() {
    observer.base.call(this);
    this._methods = new $.hash();
}
observer.prototype = { 
    add: function(method, scope, id) {
        var mid = id || $.uid("observerMethod"), scp = scope || this;
        this._methods.add(mid, { m: method, s: scp });
        return this;
    },
    remove: function(id) {
        this._methods.remove(id);
        return this;
    },
    clear: function(){
        this._methods.clear();
        return this;
    },
    notify: function() {
        var it = new $.iterator(this._methods.values()), args = arguments;
        it.each(function(subscriber) {
            if(!$.exists(subscriber.m))
                throw $.ku4exception("$.observer", $.str.format("Invalid or null method"));
            subscriber.m.apply(subscriber.s, args);
        });
        return this;
    },
    isEmpty: function(){ return this._methods.isEmpty(); }
};
$.Class.extend(observer, $.Class);
$.observer = function() { return new observer(); };
$.observer.Class = observer;