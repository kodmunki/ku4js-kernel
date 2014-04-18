$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("asserters");

    test('isArray', function () {
        expect(2);
        ok($.isArray([]));
        ok($.isArray(new Array()));
    });

    test('isNotArray',  function () {
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

    test('isBool',  function () {
        expect(2);
        ok($.isBool(true));
        ok($.isBool(false));
    });

    test('isNotBool',  function () {
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

    test('isDate',  function () {
        expect(1);
        ok($.isDate(new Date()));
    });

    test('isNotDate',  function () {
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

    test('isNumber',  function () {
        expect(2);
        ok($.isNumber(0));
        ok($.isNumber(new Number()));
    });

    test('isNotNumber',  function () {
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

    test('isObject',  function () {
        expect(2);
        ok($.isObject({}));
        ok($.isObject(new Object()));
    });

    test('isNotObject',  function () {
        expect(12);
        ok(!$.isObject(null));
        ok(!$.isObject(undefined));
        ok(!$.isObject(true));
        ok(!$.isObject(false));
        ok(!$.isObject(""));
        ok(!$.isObject(new String()));
        ok(!$.isObject(0));
        ok(!$.isObject(new Number()));
        ok(!$.isObject([]));
        ok(!$.isObject(new Array()));
        ok(!$.isObject(function() { } ));
        ok(!$.isObject(new Function()));

    });

    test('isFunction',  function () {
        expect(2);
        ok($.isFunction(function() { }));
        ok($.isFunction(new Function()));
    });

    test('isNotFunction',  function () {
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

    test('isString',  function () {
        expect(2);
        ok($.isString(""));
        ok($.isString(new String()));
    });

    test('isNotString',  function () {
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

    test('isUndefined',  function () {
        expect(1);
        ok($.isUndefined(undefined));
    });

    test('isNotUndefined',  function () {
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

    test('isEmpty',  function () {
        expect(4);
        ok($.isNullOrEmpty(null));
        ok($.isNullOrEmpty(undefined));
        ok($.isNullOrEmpty(""));
        ok($.isNullOrEmpty(new String()));
    });

    test('isNotEmpty',  function () {
        expect(7);
        ok(!$.isNullOrEmpty("null"));
        ok(!$.isNullOrEmpty("undefined"));
        ok(!$.isNullOrEmpty(" "));
        ok(!$.isNullOrEmpty("a"));
        ok(!$.isNullOrEmpty(" a "));
        ok(!$.isNullOrEmpty("1"));
        ok(!$.isNullOrEmpty(" 1 "));
    });

    test('isNullOrEmpty',  function () {
        expect(4);
        ok($.isNullOrEmpty(null));
        ok($.isNullOrEmpty(undefined));
        ok($.isNullOrEmpty(""));
        ok($.isNullOrEmpty(new String()));
    });

    test('isNotNullOrEmpty',  function () {
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

    test('exists',  function () {
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

    test('areEqual', function () {
        expect(10);
        ok($.areEqual(null, null));
        ok($.areEqual(undefined, undefined));
        ok($.areEqual(true, true));
        ok($.areEqual(false, false));
        ok($.areEqual(0, 0));
        ok($.areEqual(Math.min(), Math.min()));
        ok($.areEqual(Math.max(), Math.max()));
        ok($.areEqual("", ""));
        ok($.areEqual("string", "string"));
        ok($.areEqual(new Date(2013, 1, 1), new Date(2013, 1, 1)));
    });

    test('areNotEqual', function () {
        expect(10);
        ok(!$.areEqual(null, undefined));
        ok(!$.areEqual(null, 0));
        ok(!$.areEqual(null, false));
        ok(!$.areEqual(null, ""));
        ok(!$.areEqual(undefined, 0));
        ok(!$.areEqual(undefined, false));
        ok(!$.areEqual(undefined, ""));
        ok(!$.areEqual(0, false));
        ok(!$.areEqual(0, ""));
        ok(!$.areEqual(false, ""));
    });

    test('notExists',  function () {
        expect(2);
        ok(!$.exists(null));
        ok(!$.exists(undefined));
    });

    test('xor',  function () {
        expect(2);
        ok($.xor(true, false));
        ok($.xor(false, true));
    });

    test('notXor',  function () {
        expect(2);
        ok(!$.xor(false, false));
        ok(!$.xor(true, true));
    })
})