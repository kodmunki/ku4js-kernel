function lock(isLocked) {
    lock.base.call(this);
    this._isLocked = isLocked || false;
}
lock.prototype = {
    isLocked: function(){ return this.get("isLocked"); },
    lock: function() { this._isLocked = true; return this; },
    unlock: function() { this._isLocked = false; return this; }
}
$.Class.extend(lock, $.Class);
$.lock = function(isLocked){return new lock(isLocked);}