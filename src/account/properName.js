function properName(first, middle, last) {
    properName.base.call(this);
    this._first = first;
    this._middle = middle || "";
    this._last = last;
}
properName.prototype = {
    first: function(){ return this._first; },
    middle: function(){ return this._middle; },
    last: function(){ return this._last; },
    full: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{F} {L}" : "{F} {M} {L}"
        return this.toStringWithFormat(format);
    },
    initials: function() {
        var format = ($.isNullOrEmpty(this._middle)) ? "{f}.{l}." : "{f}.{m}.{l}."
        return this.toStringWithFormat(format);
    },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.first() == this._first &&
                other.middle() == this._middle &&
                other.last() == this._last;
    },
    toStringWithFormat: function(format) {
        var firstInitial = this._first.charAt(0),
            middleInitial = this._middle.charAt(0),
            lastInitial = this._last.charAt(0);

        return format.replace("{F}", this._first)
                     .replace("{M}", this._middle)
                     .replace("{L}", this._last)
                     .replace("{f}", firstInitial)
                     .replace("{m}", middleInitial)
                     .replace("{l}", lastInitial);
    }
}
$.Class.extend(properName, $.Class);

$.properName = function(first, middle, last) { return new properName(first, middle, last); }
$.properName.Class = properName;