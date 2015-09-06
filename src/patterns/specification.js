function abstractSpec() { }
abstractSpec.prototype = {
    $isSatisfiedBy: function(v) { },
    isSatisfiedBy: function(v) {return this.$isSatisfiedBy(v);},
    and: function(spec) { return new andSpec(this, spec); },
    or: function(spec) { return new orSpec(this, spec); },
    xor: function(spec) { return new xorSpec(this, spec); },
    not: function() { return new notSpec(this); }
};
function andSpec (a, b) {
    andSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
andSpec.prototype.$isSatisfiedBy = function(c) {
    return this.$1.isSatisfiedBy(c) &&
            this.$2.isSatisfiedBy(c);
};
$.Class.extend(andSpec, abstractSpec);

function orSpec(a, b) {
    orSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
orSpec.prototype.$isSatisfiedBy = function(candidate) {
    return this.$1.isSatisfiedBy(candidate) ||
            this.$2.isSatisfiedBy(candidate);
};

$.Class.extend(orSpec, abstractSpec);

function xorSpec(a, b) {
    xorSpec.base.call(this);
    this.$1 = a;
    this.$2 = b;
}
xorSpec.prototype.$isSatisfiedBy = function(candidate) {
    return $.xor(this.$1.isSatisfiedBy(candidate),
                 this.$2.isSatisfiedBy(candidate));
};
$.Class.extend(xorSpec, abstractSpec);

function trueSpec() { trueSpec.base.call(this); }
trueSpec.prototype.$isSatisfiedBy = function(candidate) { return true; };
$.Class.extend(trueSpec, abstractSpec);

function falseSpec() { falseSpec.base.call(this); }
falseSpec.prototype.$isSatisfiedBy = function(candidate) { return false; };
$.Class.extend(falseSpec, abstractSpec);

function notSpec(s) {
    notSpec.base.call(this);
    this._s = s;
}
notSpec.prototype.$isSatisfiedBy = function(candidate) {
    return !this._s.isSatisfiedBy(candidate);
};
$.Class.extend(notSpec, abstractSpec);

function spec(func){
    spec.base.call(this);
    this.$isSatisfiedBy = func;
}
$.Class.extend(spec, abstractSpec);

$.spec = function(func){
    return new spec(func);
};