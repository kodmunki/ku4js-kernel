$(function(){
    function notOk(s, m) {equal(s,false,m);}
    
    module("coord");
    
    test("create", function(){
        raises(function(){ $.coord(null, null); }, "");
        raises(function(){ $.coord(undefined, undefined); }, "");
        raises(function(){ $.coord("", ""); }, "");
        raises(function(){ $.coord("1", "1"); }, "");
        raises(function(){ $.coord("a", "a"); }), "";
        
        ok($.coord(0, 0));
        ok($.coord(1, 1));
        ok($.coord(-1, -1));
    });
    test("isInstance", function(){
        ok($.coord.isInstance($.coord(0, 0)));
        ok(!$.coord.isInstance($.point(1, 1)));
    });
    var zero = $.coord.zero(),
        pOne = $.coord(1, 1),
        pTwo = $.coord(2, 2),
        nOne = $.coord(-1, -1),
        nTwo = $.coord(-2, -2);
    
    test("equals", function(){ 
        ok(pTwo.equals(pTwo));
        ok(nTwo.equals(nTwo));
        ok(zero.equals(zero));
    });
    test("add", function(){
        ok(pOne.add(pOne).equals(pTwo));
        ok(nOne.add(nOne).equals(nTwo));
        ok(pOne.add(nOne).equals(zero));
    });
    test("subtract", function(){
        ok(pTwo.subtract(pOne).equals(pOne));
        ok(nOne.subtract(nOne).equals(zero));
        ok(pOne.subtract(nOne).equals(pTwo));
    });
    test("multiply", function(){
        ok(pTwo.multiply(pOne).equals(pTwo));
        ok(nTwo.multiply(nOne).equals(pTwo));
        ok(pOne.multiply(zero).equals(zero));
    });
    test("divide", function(){ 
        ok(pTwo.divide(pOne).equals(pTwo));
        ok(nTwo.divide(nOne).equals(pTwo));
        ok(nTwo.divide(pTwo).equals(nOne));
    });
    test("round", function(){
        var nHigh = $.coord(-1.4, -1.4),
            nLow = $.coord(-1.6, -1.6),
            pHigh = $.coord(1.6, 1.6),
            pLow = $.coord(1.4, 1.4);
            
        ok(nHigh.round().equals(nOne));
        ok(nLow.round().equals(nTwo));
        ok(pHigh.round().equals(pTwo));
        ok(pLow.round().equals(pOne));
    });
    test("half", function(){
        ok(pTwo.half().equals(pTwo.divide(pTwo)));
    });
    test("value", function(){
        equal(pTwo.value().x, 2);
        equal(pTwo.value().y, 2);
    });
    test("toEm", function(){
        equal(pTwo.toEm().x(), "2em");
        equal(pTwo.toEm().y(), "2em");
    });
    test("toPixel", function(){ 
        equal(pTwo.toPixel().x(), "2px");
        equal(pTwo.toPixel().y(), "2px");
    });
    test("toString", function(){
        equal(pTwo.toString(), "(2,2)");
    });
    test("canParse", function() {
        ok($.coord.canParse([3,3]));
        ok($.coord.canParse({x:3,y:3}));
        ok($.coord.canParse({left:3,top:3}));
        ok($.coord.canParse({width:3,height:3}));
    });
    test("parse", function() {
        ok($.coord.parse([3,3]).equals($.coord(3, 3)));
        ok($.coord.parse({x:3,y:3}).equals($.coord(3, 3)));
        ok($.coord.parse({left:3,top:3}).equals($.coord(3, 3)));
        ok($.coord.parse({width:3,height:3}).equals($.coord(3, 3)));
    });
});