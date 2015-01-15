function fraction(numerator, denominator) {
    if (!$.isNumber(numerator) || !$.isNumber(denominator))
        throw $.ku4exception("$.fraction", $.str.format("Invalid arguments numerator= {0}, denominator= {1} ", numerator, denominator));

    this._numerator = numerator;
    this._denominator = denominator;
}
fraction.prototype = {
    numerator: function() {
        return this._numerator;
    },
    denominator: function() {
        return this._denominator;
    },
    value: function() {
        return this._numerator / this._denominator;
    },
    equals: function(other) {
        return this.value() == other.value();
    },
    add: function(other) {
        var commonDenominator = this.commonDenominator(other),
            fractionA = this.withDenominator(commonDenominator),
            fractionB = other.withDenominator(commonDenominator),
            numerator = fractionA.numerator() + fractionB.numerator();

        return new fraction(numerator, commonDenominator);
    },
    subtract: function(other) {
        var commonDenominator = this.commonDenominator(other),
            fractionA = this.withDenominator(commonDenominator),
            fractionB = other.withDenominator(commonDenominator),
            numerator = fractionA.numerator() - fractionB.numerator();

        return new fraction(numerator, commonDenominator);
    },
    multiply: function(other) {
        var numerator = this._numerator * other.numerator(),
            denominator = this._denominator * other.denominator();

        return new fraction(numerator, denominator);
    },
    divide: function(other) {
        return this.multiply(other.reciprocal());
    },
    reciprocal: function() {
        return new fraction(this._denominator, this._numerator);
    },
    commonDenominator: function(other) {
        return this._denominator * other.denominator();
    },
    withDenominator: function(value) {
        var numerator = (value / this._denominator) * this._numerator;

        return new fraction(numerator, value);
    },
    simplify: function() {
        var gcd = $.math.gcd(this._denominator, this._numerator);
        return new fraction(this._numerator / gcd, this._denominator / gcd);
    },
    toString: function() {
        return this._numerator + "/" + this._denominator;
    }
};
$.fraction = function(numerator, denominator) { return new fraction(numerator, denominator); };
$.fraction.isInstance = function(other) { return other instanceof fraction; };