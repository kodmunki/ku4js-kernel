function observer(name) {
    observer.base.call(this);
    this._name = name || $.uid();
    this._methods = new $.hash();
}
observer.prototype = { 
    add: function(method, scope, id) {
        var mid = id || $.uid(),
            scp = scope || this;

        method.__ku4observer_name__ = this._name;
        method.__ku4observer_medthod_id__ = mid;
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
        var it = new $.iterator(this._methods.values()), args = arguments,
            name = this._name;
        it.each(function(subscriber) {
            var method = subscriber.m;
            if(!$.exists(method)) {
                throw $.ku4exception("$.observer", $.str.format("Attempt to call invalid or undefined method @ observer: {0}.\n", name));
            }
            else {
                try { method.apply(subscriber.s, args); }
                catch(e) {
                    throw $.ku4exception("$.observer", $.str.format("Error in subscribed method @ observer: {0} methodId: {1}.\nmessage:{2}\n\n", name, method.__ku4observer_medthod_id__, e.message));
                }
            }
        });
        return this;
    },
    isEmpty: function(){ return this._methods.isEmpty(); }
};
$.Class.extend(observer, $.Class);
$.observer = function(name) { return new observer(name); };
$.observer.Class = observer;