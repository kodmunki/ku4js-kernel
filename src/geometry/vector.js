function vector(x, y) {
    if (!$.isNumber(x) || !$.isNumber(y))
        throw $.ku4exception("$.vector", $.str.format("Invalid arguments x= {0}, y= {1} ", x, y));
    
    vector.base.call(this, x, y);
    
    this._lengthSquared = vector_calculateLengthSquared(this, x, y);
    this._length = vector_calculateLength(this, this._lengthSquared);
    this._unitNormalX = vector_calculateUnitNormal(this, x);
    this._unitNormalY = vector_calculateUnitNormal(this, y);
}

vector.prototype = {
    magnitude: function(){ return this.get("length"); },
    equals: function(other) {
        return (other instanceof vector) &&
            ((this._x === other.x()) && (this._y === other.y()));
    },
    normal: function() { return $.vector(this._unitNormalX, this._unitNormalY); },
    invert: function() { return $.vector(this.x() * -1, this.y() * -1); },
    norm: function() { return $.vector(Math.abs(this.x()), Math.abs(this.y())); },
    perpendicular: function(){ return $.vector(this.y() * -1, this.x()); },
    isZero: function() { return this.x() == 0 && this.y() == 0; },
    add: function(vector) { return $.vector(this.x() + vector.x(), this.y() + vector.y()); },
    dot: function(vector) { return (this.x() * vector.x()) + (this.y() * vector.y()); },
    perpendicularAtTo: function(vector) {
        var p = vector.add(this.projectionOfOnto(vector).invert());
        return $.vector(p.x(), p.y());
    },
    projectionOfOnto: function(vector) {
        var p = vector.normal().scale(this.dot(vector.normal()));
        return $.vector(p.x(), p.y());
    },
    scale: function(scalar) {
        return $.vector((this.x() * scalar), (this.y() * scalar));
    },
    unitNormalDot: function(vector) {
        return (this.normal().x() * vector.normal().x()) +
                (this.normal().y() * vector.normal().y());
    },
    reflect: function(incident){
        if(incident.isZero()) return this;
        var inorm = incident.normal()
        return this.add(inorm.scale(2*(inorm.dot(this))).invert());
    },
    round: function(decimal){
        var d = decimal || 0;
        return $.vector($.math.round(this.x(), d), $.math.round(this.y(), d));
    }
}
$.Class.extend(vector, $.coord.Class);

$.vector = function(x, y) { return new vector(x, y); }
$.vector.Class = vector;
$.vector.zero = function() { return $.vector(0,0); }
$.vector.random = function(seedx, seedy){
    var x = seedx * Math.random(), y = seedy * Math.random();
    return $.vector(x, y);
}

function vector_calculateLength (v, lengthSquared) {
    if (v.isZero()) return 0;
    return Math.sqrt(lengthSquared);
}
function vector_calculateLengthSquared(v, x, y) {
    if (v.isZero()) return 0;
    return Math.pow(x, 2) + Math.pow(y, 2)
}
function vector_calculateUnitNormal (v, scalar) {
   if (v.isZero()) return 0;
   return scalar / v.magnitude();
}