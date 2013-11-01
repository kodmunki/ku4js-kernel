$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    test('isArray', function (test) {
        expect(2);
        ok($.isArray([]));
        ok($.isArray(new Array()));
    });

    test('isNotArray',  function (test) {
        expect(13);
        ok(!$.isArray(null));
        ok(!$.isArray(undefined));
        ok(!$.isArray(true));
        ok(!$.isArray(false));
        ok(!$.isArray(""));
        ok(!$.isArray(new String()));
        ok(!$.isArray(0));
        ok(!$.isArray(new Number()));
        ok(!$.isArray(new Date()));
        ok(!$.isArray({}));
        ok(!$.isArray(new Object()));
        ok(!$.isArray(function() { } ));
        ok(!$.isArray(new Function()));
    });

    test('isBool',  function (test) {
        expect(2);
        ok($.isBool(true));
        ok($.isBool(false));
    });

    test('isNotBool',  function (test) {
        expect(13);        ok(!$.isBool(null));
        ok(!$.isBool(undefined));
        ok(!$.isBool([]));
        ok(!$.isBool(new Array()));
        ok(!$.isBool(""));
        ok(!$.isBool(new String()));
        ok(!$.isBool(0));
        ok(!$.isBool(new Number()));
        ok(!$.isBool(new Date()));
        ok(!$.isBool({}));
        ok(!$.isBool(new Object()));
        ok(!$.isBool(function() { } ));
        ok(!$.isBool(new Function()));
    });

    test('isDate',  function (test) {
        expect(1);
        ok($.isDate(new Date()));
    });

    test('isNotDate',  function (test) {
        expect(14);
        ok(!$.isDate(null));
        ok(!$.isDate(undefined));
        ok(!$.isDate(true));
        ok(!$.isDate(false));
        ok(!$.isDate([]));
        ok(!$.isDate(new Array()));
        ok(!$.isDate(""));
        ok(!$.isDate(new String()));
        ok(!$.isDate(0));
        ok(!$.isDate(new Number()));
        ok(!$.isDate({}));
        ok(!$.isDate(new Object()));
        ok(!$.isDate(function() { } ));
        ok(!$.isDate(new Function()));
    });

    test('isNumber',  function (test) {
        expect(2);
        ok($.isNumber(0));
        ok(!$.isNumber(new Number()));
    });

    test('isNotNumber',  function (test) {
        expect(12);
        ok(!$.isNumber(null));
        ok(!$.isNumber(undefined));
        ok(!$.isNumber(true));
        ok(!$.isNumber(false));
        ok(!$.isNumber([]));
        ok(!$.isNumber(new Array()));
        ok(!$.isNumber(""));
        ok(!$.isNumber(new String()));
        ok(!$.isNumber({}));
        ok(!$.isNumber(new Object()));
        ok(!$.isNumber(function() { } ));
        ok(!$.isNumber(new Function()));
    });


    test('isObject',  function (test) {
        expect(6);
        ok($.isObject([]));
        ok($.isObject(new Array()));
        ok($.isObject(new String()));
        ok($.isObject(new Number()));
        ok($.isObject({}));
        ok($.isObject(new Object()));
    });


    test('isNotObject',  function (test) {
        expect(8);
        ok(!$.isObject(null));
        ok(!$.isObject(undefined));
        ok(!$.isObject(true));
        ok(!$.isObject(false));
        ok(!$.isObject(""));
        ok(!$.isObject(0));
        ok(!$.isObject(function() { } ));
        ok(!$.isObject(new Function()));
    });

    test('isFunction',  function (test) {
        expect(2);
        ok($.isFunction(function() { }));
        ok($.isFunction(new Function()));
    });

    test('isNotFunction',  function (test) {
        expect(12);
        ok(!$.isFunction(null));
        ok(!$.isFunction(undefined));
        ok(!$.isFunction(true));
        ok(!$.isFunction(false));
        ok(!$.isFunction([]));
        ok(!$.isFunction(new Array()));
        ok(!$.isFunction(""));
        ok(!$.isFunction(new String()));
        ok(!$.isFunction(0));
        ok(!$.isFunction(new Number()));
        ok(!$.isFunction({}));
        ok(!$.isFunction(new Object()));
    });

    test('isString',  function (test) {
        expect(2);
        ok($.isString(""));
        ok($.isString(new String()));
    });

    test('isNotString',  function (test) {
        expect(12);
        ok(!$.isString(null));
        ok(!$.isString(undefined));
        ok(!$.isString(true));
        ok(!$.isString(false));
        ok(!$.isString([]));
        ok(!$.isString(new Array()));
        ok(!$.isString(0));
        ok(!$.isString(new Number()));
        ok(!$.isString({}));
        ok(!$.isString(new Object()));
        ok(!$.isString(function() { } ));
        ok(!$.isString(new Function()));
    });

    test('isUndefined',  function (test) {
        expect(1);
        ok($.isUndefined(undefined));
    });

    test('isNotUndefined',  function (test) {
        expect(13);
        ok(!$.isUndefined(null));
        ok(!$.isUndefined(true));
        ok(!$.isUndefined(false));
        ok(!$.isUndefined([]));
        ok(!$.isUndefined(new Array()));
        ok(!$.isUndefined(""));
        ok(!$.isUndefined(new String()));
        ok(!$.isUndefined(0));
        ok(!$.isUndefined(new Number()));
        ok(!$.isUndefined({}));
        ok(!$.isUndefined(new Object()));
        ok(!$.isUndefined(function() { } ));
        ok(!$.isUndefined(new Function()));
    });

    test('isEmpty',  function (test) {
        expect(4);
        ok($.isNullOrEmpty(null));
        ok($.isNullOrEmpty(undefined));
        ok($.isNullOrEmpty(""));
        ok($.isNullOrEmpty(new String()));
    });

    test('isNotEmpty',  function (test) {
        expect(7);
        ok(!$.isNullOrEmpty("null"));
        ok(!$.isNullOrEmpty("undefined"));
        ok(!$.isNullOrEmpty(" "));
        ok(!$.isNullOrEmpty("a"));
        ok(!$.isNullOrEmpty(" a "));
        ok(!$.isNullOrEmpty("1"));
        ok(!$.isNullOrEmpty(" 1 "));
    });

    test('isNullOrEmpty',  function (test) {
        expect(4);
        ok($.isNullOrEmpty(null));
        ok($.isNullOrEmpty(undefined));
        ok($.isNullOrEmpty(""));
        ok($.isNullOrEmpty(new String()));
    });

    test('isNotNullOrEmpty',  function (test) {
        expect(11);
        ok(!$.isNullOrEmpty(true));
        ok(!$.isNullOrEmpty(false));
        ok(!$.isNullOrEmpty([]));
        ok(!$.isNullOrEmpty(new Array()));
        ok(!$.isNullOrEmpty(0));
        ok(!$.isNullOrEmpty(new Number()));
        ok(!$.isNullOrEmpty(new Date()));
        ok(!$.isNullOrEmpty({}));
        ok(!$.isNullOrEmpty(new Object()));
        ok(!$.isNullOrEmpty(function() { } ));
        ok(!$.isNullOrEmpty(new Function()));
    });

    test('exists',  function (test) {
        expect(12);
        ok($.exists(true));
        ok($.exists(false));
        ok($.exists([]));
        ok($.exists(new Array()));
        ok($.exists(""));
        ok($.exists(new String()));
        ok($.exists(0));
        ok($.exists(new Number()));
        ok($.exists({}));
        ok($.exists(new Object()));
        ok($.exists(function() { } ));
        ok($.exists(new Function()));
    });
    test('notExists',  function (test) {
        expect(2);
        ok(!$.exists(null));
        ok(!$.exists(undefined));
    });

    test('xor',  function (test) {
        expect(2);
        ok($.xor(true, false));
        ok($.xor(false, true));
    });

    test('notXor',  function (test) {
        expect(2);
        ok(!$.xor(false, false));
        ok(!$.xor(true, true));
    })
})