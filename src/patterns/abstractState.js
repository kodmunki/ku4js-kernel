$.abstractState = function(states) {
    $.abstractState.base.call(this);
    this.states(states);
}
$.abstractState.prototype = {
    context: function(context) { return this.property("context", context); },
    states: function(states) { return this.set("states", states); },
    state: function(state) {
        var c = this._context;
        c.state(new this._states[state](c));
        return this;
    }
}
$.Class.extend($.abstractState, $.Class);