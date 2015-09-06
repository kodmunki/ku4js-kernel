$.abstractContext = function(state) {
    $.abstractContext.base.call(this);
    this.state(state);
};
$.abstractContext.prototype = {
    state: function(state) {
        if(!$.exists(state)) return this._state;
        return this.set("state", state.context(this));
    }
};
$.Class.extend($.abstractContext, $.Class);