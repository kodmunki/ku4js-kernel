function queue() {
    this._q = [];
}
queue.prototype = {
    isEmpty: function() { return this._q.length == 0; },
    enqueue: function(item) {
        var q = this._q;
        q[q.length] = item;
        return this;
    },
    dequeue: function() {
        var q = this._q,
            item = q[0];
        q.splice(0,1);
        return item;
    },
    clear: function() { this._q = []; }
};
$.fifo = function(){ return new queue(); };
$.fifo.Class = queue;