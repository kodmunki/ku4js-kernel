function phoneNumber(number) { this._value = number; }
phoneNumber.prototype = {
    value: function() { return this._value; },
    equals: function(other) {
        if(!$.exists(other)) return false;
        return other.value() == this._value;
    },
    toStringWithFormat: function(format) {
        var formattedValue = format;
        $.list((this._value.toString().split(""))).each(function(number){
            formattedValue.replace("#", number);
        });
        return formattedValue.replace(/#/g, "");
    }
}
$.phoneNumber = function(number){ return new phoneNumber(number); }
$.phoneNumber.parse = function(str) {
    return new phoneNumber(parseInt(str.replace(/[^0-9]/gi, "")));
}