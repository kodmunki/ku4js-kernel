$(function(){
    function notOk(s, m) {equal(s,false,m);}
    
    module("vector");
    
    test("create", function(){
        raises(function(){ $.vector(null, null); });
        raises(function(){ $.vector(undefined, undefined); });
        raises(function(){ $.vector("", ""); });
        raises(function(){ $.vector("1", "1"); });
        raises(function(){ $.vector("a", "a"); });
        
        ok($.vector(0, 0));
        ok($.vector(1, 1));
        ok($.vector(-1, -1));
    });


    var zero = $.vector.zero(),
        pOne = $.vector(1, 1),
        pTwo = $.vector(2, 2),
        nOne = $.vector(-1, -1),
        nTwo = $.vector(-2, -2);
    
    test("equals", function(){
        ok(pTwo.equals(pTwo));
        ok(nTwo.equals(nTwo));
        ok(zero.equals(zero));
    });
    test("round", function(){
        ok($.vector(.345, .345).round(-2).equals($.vector(.35, .35)));
    });
    test("normal", function(){
        ok(pOne.normal().round(-3).equals($.vector(.707,.707)));
    });
    test("invert", function(){
        ok(nOne.invert().equals(pOne));
    });
    test("norm", function(){
        ok(nOne.norm().equals(pOne));
    });
    test("perpendicular", function(){
        ok(pOne.perpendicular().equals($.vector(-1, 1)));
    });
    test("isZero", function(){
        ok($.vector(0,0).isZero());
        notOk($.vector(1,1).isZero());
    });
    test("add", function(){
        ok(pOne.add(pOne).equals(pTwo));
        ok(nOne.add(nOne).equals(nTwo));
        ok(pOne.add(nOne).isZero());
    });
    test("dot", function(){
        equal(pOne.dot(pTwo), 4);
    });
    test("perpendicularAtTo", function(){
        ok(pOne.perpendicularAtTo(pTwo).round().equals(pOne));
        ok(pOne.perpendicularAtTo(nOne).round().equals(nTwo));
    });
    test("projectionOfOnto", function(){
        ok(pOne.projectionOfOnto(pOne).round().equals(pOne));
        ok(pOne.projectionOfOnto(nOne).round().equals(pOne));
    });
    test("scale", function(){
        ok(pOne.scale(2).equals(pTwo));
    });
    test("reflect", function(){
        ok(pOne.reflect($.vector(0, 1)).equals($.vector(1, -1))); 
    });
});