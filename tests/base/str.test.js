var $ = require('../../lib/base/str');

exports['build'] = function (test) {
    test.expect(5);
    test.equal($.build(null), "null");
    test.equal($.build(undefined), "undefined");
    test.equal($.build("","",""), "");
    test.equal($.build(" "," "," "), "   ");
    test.equal($.build("a","b","c"), "abc");
    test.done();
};

exports['format'] = function (test) {
    test.expect(5);
    test.equal($.format(null), null);
    test.equal($.format(undefined), undefined);
    test.equal($.format(""), "");
    test.equal($.format("{0}{1}{2}","1","2","3"), "123");
    test.equal($.format("{0}{0}{1}","1","2","3"), "112");
    test.done();
};

exports['trimStart'] = function (test) {
    test.expect(4);
    test.throws(function() { $.trimStart(null); });
    test.throws(function() { $.trimStart(undefined); });
    test.equal($.trimStart(""), "");
    test.equal($.trimStart(" string"), "string");
    test.done();
};

exports['trimEnd'] = function (test) {
    test.expect(4);
    test.throws(function() { $.trimEnd(null); });
    test.throws(function() { $.trimEnd(undefined); });
    test.equal($.trimEnd(""), "");
    test.equal($.trimEnd("string "), "string");
    test.done();
};

exports['trim'] = function (test) {
    test.expect(4);
    test.throws(function() { $.trim(null); });
    test.throws(function() { $.trim(undefined); });
    test.equal($.trim(""), "");
    test.equal($.trim(" string "), "string");
    test.done();
};

exports['encodeBase64'] = function (test) {
    test.expect(5);
    test.throws(function() { $.encodeBase64(null); });
    test.throws(function() { $.encodeBase64(undefined); });
    test.equal($.encodeBase64(""), "");
    test.equal($.encodeBase64("This Is an (* excellent _+} Test"), "VGhpcyBJcyBhbiAoKiBleGNlbGxlbnQgXyt9IFRlc3Q=");
    test.equal($.encodeBase64(" This Is an (* excellenter _+} Test "), "IFRoaXMgSXMgYW4gKCogZXhjZWxsZW50ZXIgXyt9IFRlc3Qg");
    test.done();
};

exports['decodeBase64'] = function (test) {
    test.expect(5);
    test.throws(function() { $.decodeBase64(null); });
    test.throws(function() { $.decodeBase64(undefined); });
    test.equal($.decodeBase64(""), "");
    test.equal($.decodeBase64("VGhpcyBJcyBhbiAoKiBleGNlbGxlbnQgXyt9IFRlc3Q="), "This Is an (* excellent _+} Test");
    test.equal($.decodeBase64("IFRoaXMgSXMgYW4gKCogZXhjZWxsZW50ZXIgXyt9IFRlc3Qg"), " This Is an (* excellenter _+} Test ");
    test.done();
};
