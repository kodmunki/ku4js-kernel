function rectangle (topLeft, dims){
    rectangle.base.call(this);
    this._topLeft = $.point.parse(topLeft);
    this._dims = $.coord.parse(dims);
    this._bottomRight = $.point.parse(this._topLeft.add(this._dims));
}
rectangle.prototype = {
    dims: function() { return this.get("dims"); },
    topLeft: function() { return this.get("topLeft"); },
    bottomRight: function() { return this.get("bottomRight"); },
    center: function() { return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half(); },
    contains: function(coord) {
        var t = this._topLeft,
            b = this._bottomRight;

        return  t.isAbove(coord) &&
                t.isLeftOf(coord) &&
                b.isRightOf(coord) &&
                b.isBelow(coord);
    },
    aspectToFit: function(other) {

        var thisDims = this.dims(),
            otherDims = other.dims(),
            width = thisDims.x(),
            height = thisDims.y(),
            maxWidth = otherDims.x(),
            maxHeight = otherDims.y();

        if (width > height && !$.isZero(width)) {
            height *= maxWidth / width;
            width = maxWidth;

            if (height > maxHeight) {
                height = maxHeight;
                width *= height / thisDims.y();
            }
        }
        else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        return $.rectangle(this.topLeft(), $.coord(width, height));
    }
};
$.Class.extend(rectangle, $.Class);
$.rectangle = function(topLeft, dims){ return new rectangle(topLeft, dims); };
$.rectangle.Class = rectangle;