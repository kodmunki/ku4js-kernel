var $ = require('../../lib/base/__asserters');

exports['isArray'] = function (test) {
    test.expect(2);
    test.ok($.isArray([]));
    test.ok($.isArray(new Array()));
    test.done();
};

exports['isNotArray'] = function (test) {
    test.expect(13);
    test.ok(!$.isArray(null));
    test.ok(!$.isArray(undefined));
    test.ok(!$.isArray(true));
    test.ok(!$.isArray(false));
    test.ok(!$.isArray(""));
    test.ok(!$.isArray(new String()));
    test.ok(!$.isArray(0));
    test.ok(!$.isArray(new Number()));
    test.ok(!$.isArray(new Date()));
    test.ok(!$.isArray({}));
    test.ok(!$.isArray(new Object()));
    test.ok(!$.isArray(function() { } ));
    test.ok(!$.isArray(new Function()));
    test.done();
};

exports['isBool'] = function (test) {
    test.expect(2);
    test.ok($.isBool(true));
    test.ok($.isBool(false));
    test.done();
};

exports['isNotBool'] = function (test) {
    test.expect(13);        test.ok(!$.isBool(null));
    test.ok(!$.isBool(undefined));
    test.ok(!$.isBool([]));
    test.ok(!$.isBool(new Array()));
    test.ok(!$.isBool(""));
    test.ok(!$.isBool(new String()));
    test.ok(!$.isBool(0));
    test.ok(!$.isBool(new Number()));
    test.ok(!$.isBool(new Date()));
    test.ok(!$.isBool({}));
    test.ok(!$.isBool(new Object()));
    test.ok(!$.isBool(function() { } ));
    test.ok(!$.isBool(new Function()));
    test.done();
};

exports['isDate'] = function (test) {
    test.expect(1);
    test.ok($.isDate(new Date()));
    test.done();
};

exports['isNotDate'] = function (test) {
    test.expect(14);
    test.ok(!$.isDate(null));
    test.ok(!$.isDate(undefined));
    test.ok(!$.isDate(true));
    test.ok(!$.isDate(false));
    test.ok(!$.isDate([]));
    test.ok(!$.isDate(new Array()));
    test.ok(!$.isDate(""));
    test.ok(!$.isDate(new String()));
    test.ok(!$.isDate(0));
    test.ok(!$.isDate(new Number()));
    test.ok(!$.isDate({}));
    test.ok(!$.isDate(new Object()));
    test.ok(!$.isDate(function() { } ));
    test.ok(!$.isDate(new Function()));
    test.done();
};

exports['isNumber'] = function (test) {
    test.expect(2);
    test.ok($.isNumber(0));
    test.ok(!$.isNumber(new Number()));
    test.done();
};

exports['isNotNumber'] = function (test) {
    test.expect(12);
    test.ok(!$.isNumber(null));
    test.ok(!$.isNumber(undefined));
    test.ok(!$.isNumber(true));
    test.ok(!$.isNumber(false));
    test.ok(!$.isNumber([]));
    test.ok(!$.isNumber(new Array()));
    test.ok(!$.isNumber(""));
    test.ok(!$.isNumber(new String()));
    test.ok(!$.isNumber({}));
    test.ok(!$.isNumber(new Object()));
    test.ok(!$.isNumber(function() { } ));
    test.ok(!$.isNumber(new Function()));
    test.done();
};


exports['isObject'] = function (test) {
    test.expect(6);
    test.ok($.isObject([]));
    test.ok($.isObject(new Array()));
    test.ok($.isObject(new String()));
    test.ok($.isObject(new Number()));
    test.ok($.isObject({}));
    test.ok($.isObject(new Object()));
    test.done();
};


exports['isNotObject'] = function (test) {
    test.expect(8);
    test.ok(!$.isObject(null));
    test.ok(!$.isObject(undefined));
    test.ok(!$.isObject(true));
    test.ok(!$.isObject(false));
    test.ok(!$.isObject(""));
    test.ok(!$.isObject(0));
    test.ok(!$.isObject(function() { } ));
    test.ok(!$.isObject(new Function()));
    test.done();
};

exports['isFunction'] = function (test) {
    test.expect(2);
    test.ok($.isFunction(function() { }));
    test.ok($.isFunction(new Function()));
    test.done();
};

exports['isNotFunction'] = function (test) {
    test.expect(12);
    test.ok(!$.isFunction(null));
    test.ok(!$.isFunction(undefined));
    test.ok(!$.isFunction(true));
    test.ok(!$.isFunction(false));
    test.ok(!$.isFunction([]));
    test.ok(!$.isFunction(new Array()));
    test.ok(!$.isFunction(""));
    test.ok(!$.isFunction(new String()));
    test.ok(!$.isFunction(0));
    test.ok(!$.isFunction(new Number()));
    test.ok(!$.isFunction({}));
    test.ok(!$.isFunction(new Object()));
    test.done();
};

exports['isString'] = function (test) {
    test.expect(2);
    test.ok($.isString(""));
    test.ok($.isString(new String()));
    test.done();
};

exports['isNotString'] = function (test) {
    test.expect(12);
    test.ok(!$.isString(null));
    test.ok(!$.isString(undefined));
    test.ok(!$.isString(true));
    test.ok(!$.isString(false));
    test.ok(!$.isString([]));
    test.ok(!$.isString(new Array()));
    test.ok(!$.isString(0));
    test.ok(!$.isString(new Number()));
    test.ok(!$.isString({}));
    test.ok(!$.isString(new Object()));
    test.ok(!$.isString(function() { } ));
    test.ok(!$.isString(new Function()));
    test.done();
};

exports['isUndefined'] = function (test) {
    test.expect(1);
    test.ok($.isUndefined(undefined));
    test.done();
};

exports['isNotUndefined'] = function (test) {
    test.expect(13);
    test.ok(!$.isUndefined(null));
    test.ok(!$.isUndefined(true));
    test.ok(!$.isUndefined(false));
    test.ok(!$.isUndefined([]));
    test.ok(!$.isUndefined(new Array()));
    test.ok(!$.isUndefined(""));
    test.ok(!$.isUndefined(new String()));
    test.ok(!$.isUndefined(0));
    test.ok(!$.isUndefined(new Number()));
    test.ok(!$.isUndefined({}));
    test.ok(!$.isUndefined(new Object()));
    test.ok(!$.isUndefined(function() { } ));
    test.ok(!$.isUndefined(new Function()));
    test.done();
};

exports['isEmpty'] = function (test) {
    test.expect(4);
    test.ok($.isNullOrEmpty(null));
    test.ok($.isNullOrEmpty(undefined));
    test.ok($.isNullOrEmpty(""));
    test.ok($.isNullOrEmpty(new String()));
    test.done();
};

exports['isNotEmpty'] = function (test) {
    test.expect(7);
    test.ok(!$.isNullOrEmpty("null"));
    test.ok(!$.isNullOrEmpty("undefined"));
    test.ok(!$.isNullOrEmpty(" "));
    test.ok(!$.isNullOrEmpty("a"));
    test.ok(!$.isNullOrEmpty(" a "));
    test.ok(!$.isNullOrEmpty("1"));
    test.ok(!$.isNullOrEmpty(" 1 "));
    test.done();
};

exports['isNullOrEmpty'] = function (test) {
    test.expect(4);
    test.ok($.isNullOrEmpty(null));
    test.ok($.isNullOrEmpty(undefined));
    test.ok($.isNullOrEmpty(""));
    test.ok($.isNullOrEmpty(new String()));
    test.done();
};

exports['isNotNullOrEmpty'] = function (test) {
    test.expect(11);
    test.ok(!$.isNullOrEmpty(true));
    test.ok(!$.isNullOrEmpty(false));
    test.ok(!$.isNullOrEmpty([]));
    test.ok(!$.isNullOrEmpty(new Array()));
    test.ok(!$.isNullOrEmpty(0));
    test.ok(!$.isNullOrEmpty(new Number()));
    test.ok(!$.isNullOrEmpty(new Date()));
    test.ok(!$.isNullOrEmpty({}));
    test.ok(!$.isNullOrEmpty(new Object()));
    test.ok(!$.isNullOrEmpty(function() { } ));
    test.ok(!$.isNullOrEmpty(new Function()));
    test.done();
};

exports['exists'] = function (test) {
    test.expect(12);
    test.ok($.exists(true));
    test.ok($.exists(false));
    test.ok($.exists([]));
    test.ok($.exists(new Array()));
    test.ok($.exists(""));
    test.ok($.exists(new String()));
    test.ok($.exists(0));
    test.ok($.exists(new Number()));
    test.ok($.exists({}));
    test.ok($.exists(new Object()));
    test.ok($.exists(function() { } ));
    test.ok($.exists(new Function()));
    test.done();
};
exports['notExists'] = function (test) {
    test.expect(2);
    test.ok(!$.exists(null));
    test.ok(!$.exists(undefined));
    test.done();
};

exports['xor'] = function (test) {
    test.expect(2);
    test.ok($.xor(true, false));
    test.ok($.xor(false, true));
    test.done();
};

exports['notXor'] = function (test) {
    test.expect(2);
    test.ok(!$.xor(false, false));
    test.ok(!$.xor(true, true));
    test.done();
};