function lock(isLocked) {
    lock.base.call(this);
    this._isLocked = isLocked || false;
}
lock.prototype = {
    isLocked: function(){ return this.get("isLocked"); },
    lock: function() { this._isLocked = true; },
    unlock: function() { this._isLocked = false; }
}
$.Class.extend(lock, $.Class);
$.lock = function(isLocked){return new lock(isLocked);}