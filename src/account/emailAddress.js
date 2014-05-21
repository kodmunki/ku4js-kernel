function emailAddress(local, domain, topLevelDomain) {
    emailAddress.base.call(this);
    this._local = local;
    this._domain = domain;
    this._topLevelDomain = topLevelDomain;
}
emailAddress.prototype = {
    local: function(){ return this._local; },
    domain: function(){ return this._domain; },
    topLevelDomain: function(){ return this._topLevelDomain; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.local() == this._local &&
                other.domain().toUpperCase() == this._domain.toUpperCase() &&
                other.topLevelDomain().toUpperCase() == this._topLevelDomain.toUpperCase();
    },
    toString: function() {
        return $.str.format("{0}@{1}.{2}", this._local, this._domain, this._topLevelDomain);
    }
};
$.Class.extend(emailAddress, $.Class);

$.emailAddress = function(local, domain, topLevelDomain) {
    return new emailAddress(local, domain, topLevelDomain);
};
$.emailAddress.Class = emailAddress;

$.emailAddress.parse = function(str){
    if (!($.exists(str)) && /@{1}/.test(str)) return null;

    var splitOnAt = str.split("@"),
        lastPart = splitOnAt[1],
        split = lastPart.split("."),
        local = splitOnAt[0],
        topLevelDomain = split.splice(split.length-1, 1),
        domain = split.join(".");

    return new emailAddress(local, domain, topLevelDomain);
};