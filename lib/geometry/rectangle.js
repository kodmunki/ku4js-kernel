function rectangle (topLeft, dims){
    rectangle.base.call(this);
    this._topLeft = $.point.parse(topLeft);
    this._dims = $.point.parse(dims);
    this._bottomRight = $.point.parse(topLeft.add(dims));
}
rectangle.prototype = {
    dims: function() { return this.get("dims"); },
    topLeft: function() { return this.get("topLeft"); },
    bottomRight: function() { return this.get("bottomRight"); },
    center: function() { return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half(); },
    contains: function(coord) {
        var t = this._topLeft,
            b = this._bottomRight;

        return t.isAbove(coord) &&
            t.isLeftOf(coord) &&
            b.isRightOf(coord) &&
            b.isBelow(coord);
    }
}
$.Class.extend(rectangle, $.Class);
$.rectangle = function(topLeft, bottomRight){ return new rectangle(topLeft, bottomRight); }