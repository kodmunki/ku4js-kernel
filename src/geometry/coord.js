function coord(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw $.ku4exception("$.coord", $.str.format("Invalid arguments x= {0}, y= {1} ", x, y));

    coord.base.call(this);
    this.x(x).y(y);
}

coord.prototype = {
    x: function(x){ return this.property("x", x); },
    y: function(y){ return this.property("y", y); },
    abs: function(){
        return new coord(Math.abs(this._x), Math.abs(this._y));
    },
    add: function(other) {
        var x = this._x + other.x(),
            y = this._y + other.y();
        return new coord(x,y);
    },
    divide: function(other) {
        var x = this._x / other.x(),
            y = this._y / other.y();
        return new coord(x, y);
    },
    equals: function(other) {
        return (this._x === other.x()) && (this._y === other.y());
    },
    multiply: function(other) {
        var x = this._x * other.x(),
            y = this._y * other.y();
        return new coord(x, y);
    },
    subtract: function(other) {
        var x = this._x - other.x(),
            y = this._y - other.y();
        return new coord(x, y);
    },
    round: function(decimal){
        var d = decimal || 0;
        return new coord($.math.round(this.x(), d), $.math.round(this.y(), d));
    },
    half: function(){ return this.divide(new coord(2, 2)); },
    value: function() { return { x: this._x, y: this._y }; },
    toEm: function() { return coord_toUnit(this, "em"); },
    toPixel: function() { return coord_toUnit(this, "px"); },
    toString: function() { return $.str.format("({0},{1})", this._x, this._y); }
};
$.Class.extend(coord, $.Class);
$.coord = function(x, y) { return new coord(x, y); };
$.coord.Class = coord;
$.coord.isInstance = function(other) { return other instanceof coord; };

function coord_toUnit(coord, unit) {
    return {
        x: function() { return coord.x() + unit; },
        y: function() { return coord.y() + unit; }
    }
}
function coord_canParse(candidate){
    try{
        if ($.isArray(candidate)) return !(isNaN(candidate[0]) || isNaN(candidate[1]));
        if ($.isObjectLiteral(candidate)) {
            if (("x" in candidate) && ("y" in candidate))
                return !(isNaN(candidate.x) || isNaN(candidate.y));
            if (("left" in candidate) && ("top" in candidate))
                return !(isNaN(candidate.left) || isNaN(candidate.top));
            if (("width" in candidate) && ("height" in candidate))
                return !(isNaN(candidate.width) || isNaN(candidate.height));
        }
        return $.coord.isInstance(candidate);
    }
    catch(e) { return false; }
}
function coord_parse(obj) {
    if (!$.exists(obj)) return null;
    if ($.coord.isInstance(obj)) return obj;
    if ($.isArray(obj)) return new coord(obj[0], obj[1]);
    if ($.isObjectLiteral(obj)) {
        if ($.exists(obj.left) && $.exists(obj.top)) return new coord(obj.left, obj.top);
        if ($.exists(obj.width) && $.exists(obj.height)) return new coord(obj.width, obj.height);
        if ($.exists(obj.x) && $.exists(obj.y)) return new coord(obj.x, obj.y);
    }
    return null;
}

$.coord.zero = function(){ return new coord(0,  0); };
$.coord.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random(seedy);
    return new coord(x, y);
};
$.coord.canParse = coord_canParse;
$.coord.parse = coord_parse;
$.coord.tryParse = function(o){ return coord_canParse(o) ? coord_parse(o) : null; };