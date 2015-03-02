if(!$.exists($.enumeration)) $.enumeration = function(values) {
    var enumeration = {}, l = values.length;
    for(var i=0; i < l; i++) {
        enumeration[values[i]] = i;
    }
    return enumeration;
};