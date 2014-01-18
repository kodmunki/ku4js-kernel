function emailAddress(username, domain, topLevelDomain) {
    emailAddress.base.call(this);
    this._username = username;
    this._domain = domain;
    this._topLevelDomain = topLevelDomain;
}
emailAddress.prototype = {
    username: function(){ return this._username; },
    domain: function(){ return this._domain; },
    topLevelDomain: function(){ return this._topLevelDomain; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return  other.username() == this._username &&
                other.domain() == this._domain &&
                other.topLevelDomain() == this._topLevelDomain;
    },
    toString: function() {
        return $.str.format("{0}@{1}.{2}", this._username, this._domain, this._topLevelDomain);
    }
}
$.Class.extend(emailAddress, $.Class);

$.emailAddress = function(username, domain, topLevelDomain) {
    return new emailAddress(username, domain, topLevelDomain);
}
$.emailAddress.Class = emailAddress;

$.emailAddress.parse = function(str){
    if (!($.exists(str)) && /@{1}/.test(str)) return null;

    var splitOnAt = str.split("@"),
        lastPart = splitOnAt[1],
        split = lastPart.split("."),
        username = splitOnAt[0]
        topLevelDomain = split.splice(split.length-1, 1),
        domain = split.join(".");

    return new emailAddress(username, domain, topLevelDomain);
}