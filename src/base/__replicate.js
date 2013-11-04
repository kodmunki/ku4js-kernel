$.replicate = function(value) {
    var result = ($.isDate(value))
        ? new Date(value)
        : ($.isArray(value))
            ? []
            : ($.isObject(value))
                ? {} : value,
        v;
    for (n in value) {
        v = value[n];
        result[n] = (($.isArray(v)) ||
                     ($.isObject(v)))
                        ? $.replicate(v) : v;
    }
    return result;
}