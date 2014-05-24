function mediator() {
    mediator.base.call(this);
    this._observers = $.hash();
    this._throwErrors = 0;
}
mediator.prototype = {
    throwErrors: function() { this._throwErrors = 2; return this; },
    logErrors: function() { this._throwErrors = 1; return this; },
    catchErrors: function() { this._throwErrors = 0; return this; },
    isEmpty: function(){ return this._observers.isEmpty(); },
    count: function() { return this._observers.count(); },
    activeSubscriptionKeys: function() { return this._observers.keys(); },
    subscribe: function(name, method, scope, id) {
        var observers = this._observers;
        if(observers.containsKey(name)) observers.find(name).add(method, scope, id);
        else observers.add(name, $.observer().add(method, scope, id));
        return this;
    },
    unsubscribe: function(name, id) {
        var observers = this._observers;
        if(observers.containsKey(name)) observers.find(name).remove(id);
        return this;
    },
    notify: function() {
        var args = $.list.parseArguments(arguments),
            data = $.list(),
            nameList = $.list();

        args.each(function(arg) {
            if(this._observers.containsKey(arg)) nameList.add(arg);
            else data.add(arg);
        }, this);

        return (nameList.isEmpty())
            ? this._notifyAll(data.toArray())
            : this._notify(data.toArray(), nameList);
    },
    clear: function(){
        this._observers
            .each(function(o){ o.value.clear(); })
            .clear();
        return this;
    },
    _notifyAll: function(data){
        $.list(this._observers.values()).each(function(observer){ observer.notify.apply(observer, data); });
        return this;
    },
    _notify: function(data, list) {
        var o = this._observers,
            t = this._throwErrors;
        list.each(function(name){
            try {
                var observer = o.find(name);
                observer.notify.apply(observer, data);
            }
            catch(e) {
                var message = "This exception may be thrown for various reasons. BE SURE TO CHECK FOR:" +
                              "\n\n1) INFINITE LOOPS: Occur due to inadvertent unfiltered calls to notify." +
                              " Check calls to notify for inadvertent missing or misspelled filters." +
                              "\n\n2) SUBSCRIBER EXCEPTIONS: Occur due to exceptions thrown in a subscriber." +
                              " Check subscriber methods for uncaught exceptions." +
                              "\n\n*NOTE: For more information see the documentation at https://github.com/kodmunki/ku4node-kernel#mediator",
                    exception = $.ku4exception("$.mediator", $.str.format("{0}. Subscriber key = {1} \n\n {2}", e.message, name, message));
                if(t == 2) throw exception;
                if(t == 1) $.ku4Log(exception.message);
            }
        });
        return this;
    }
};
$.Class.extend(mediator, $.Class);
$.mediator = function() { return new mediator(); }
$.mediator.Class = mediator;