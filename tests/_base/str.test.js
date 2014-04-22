$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("str");

    test('build', function () {
        expect(5);
        equal($.str.build(null), "null");
        equal($.str.build(undefined), "undefined");
        equal($.str.build("","",""), "");
        equal($.str.build(" "," "," "), "   ");
        equal($.str.build("a","b","c"), "abc");
    });
    
    test('format', function () {
        expect(5);
        equal($.str.format(null), null);
        equal($.str.format(undefined), undefined);
        equal($.str.format(""), "");
        equal($.str.format("{0}{1}{2}","1","2","3"), "123");
        equal($.str.format("{0}{0}{1}","1","2","3"), "112");
    });

    test('render', function () {
        var template = "{{greeting}}, my name is {{name}}. I am {{age}} years old. Born on {{month}}, {{ordinal}} {{year}}.",
            person1 = {greeting:"Hello", name:"John", age:"30", month:"January", ordinal:"1st", year:"1980"},
            person2 = {greeting:"Yo", name:"Jane", age:"20", month:"February", ordinal:"7th", year:"1990"},
            person3 = {greeting:"Yo", name:"Jane", age:"20", month:"February", ordinal:"7th"},
            person4 = {greeting:"Yo", name:"Jane", age:"20", month:"February", ordinal:"7th"};
        expect(4);
        equal($.str.render(template, person1), "Hello, my name is John. I am 30 years old. Born on January, 1st 1980.");
        equal($.str.render(template, person2), "Yo, my name is Jane. I am 20 years old. Born on February, 7th 1990.");
        equal($.str.render(template, person3), "Yo, my name is Jane. I am 20 years old. Born on February, 7th {{year}}.");
        equal($.str.render(template, person4, ""), "Yo, my name is Jane. I am 20 years old. Born on February, 7th .");
    });
    
    test('trimStart', function () {
        expect(4);
        throws(function() { $.str.trimStart(null); });
        throws(function() { $.str.trimStart(undefined); });
        equal($.str.trimStart(""), "");
        equal($.str.trimStart(" string"), "string");
    });
    
    test('trimEnd', function () {
        expect(4);
        throws(function() { $.str.trimEnd(null); });
        throws(function() { $.str.trimEnd(undefined); });
        equal($.str.trimEnd(""), "");
        equal($.str.trimEnd("string "), "string");
    });
    
    test('trim', function () {
        expect(4);
        throws(function() { $.str.trim(null); });
        throws(function() { $.str.trim(undefined); });
        equal($.str.trim(""), "");
        equal($.str.trim(" string "), "string");
    });
    
    test('encodeBase64', function () {
        expect(5);
        throws(function() { $.str.encodeBase64(null); });
        throws(function() { $.str.encodeBase64(undefined); });
        equal($.str.encodeBase64(""), "");
        equal($.str.encodeBase64("This Is an (* excellent _+} Test"), "VGhpcyBJcyBhbiAoKiBleGNlbGxlbnQgXyt9IFRlc3Q=");
        equal($.str.encodeBase64(" This Is an (* excellenter _+} Test "), "IFRoaXMgSXMgYW4gKCogZXhjZWxsZW50ZXIgXyt9IFRlc3Qg");
    });
    
    test('decodeBase64', function () {
        expect(5);
        throws(function() { $.str.decodeBase64(null); });
        throws(function() { $.str.decodeBase64(undefined); });
        equal($.str.decodeBase64(""), "");
        equal($.str.decodeBase64("VGhpcyBJcyBhbiAoKiBleGNlbGxlbnQgXyt9IFRlc3Q="), "This Is an (* excellent _+} Test");
        equal($.str.decodeBase64("IFRoaXMgSXMgYW4gKCogZXhjZWxsZW50ZXIgXyt9IFRlc3Qg"), " This Is an (* excellenter _+} Test ");
    });
});
