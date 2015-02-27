function stack() {
    this._q = [];
}
stack.prototype = {
    isEmpty: function() { return this._q.length == 0; },
    push: function(item) {
        var q = this._q;
        q[q.length] = item;
        return this;
    },
    pop: function() {
        return this._q.pop();
    },
    clear: function() { this._q = []; }
};
$.lifo = function(){ return new stack(); };
$.lifo.Class = stack;