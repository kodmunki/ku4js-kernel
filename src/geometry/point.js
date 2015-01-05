function point(x, y) {
    point.base.call(this, x, y);
}

point.prototype = {
    isAbove: function(other) { return this.y() < other.y(); },
    isBelow: function(other) { return this.y() > other.y(); },
    isLeftOf: function(other) { return this.x() < other.x(); },
    isRightOf: function(other) { return this.x() > other.x(); },
    distanceFrom: function(other) { return $.vector(this.x() - other.x(), this.y() - other.y()); },
    distanceTo: function(other) { return this.distanceFrom(other).invert(); }
};
$.Class.extend(point, $.coord.Class);

$.point = function(x, y) { return new point(x, y); };
$.point.Class = point;
$.point.isInstance = function(other) { return other instanceof point; };

$.point.zero = function(){ return new point(0,0); };
$.point.canParse = point_canParse;
$.point.parse = point_parse;
$.point.tryParse = function(candidate){ return point_canParse(candidate) ? point_parse(candidate) : null; };

function point_canParse(candidate){
    try { return  $.point.isInstance(point) || $.coord.canParse(candidate) }
    catch(e) { return false; }
}
function point_parse(obj) {
    if($.point.isInstance(obj)) return obj;
    var coord = $.coord.parse(obj);
    return new point(coord.x(), coord.y());
};