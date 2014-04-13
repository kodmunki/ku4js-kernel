$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("stack");

    test('create', function () {
        expect(1);
        ok($.lifo());
    });
    
    test('methods', function () {
        expect(7);
    
        var stack = $.lifo();
        ok(stack.isEmpty());
    
        stack.push(1).push(2).push(3);
        ok(!stack.isEmpty());
    
        stack.clear();
        ok(stack.isEmpty());
    
        stack.push(1).push(2).push(3);
        equal(stack.pop(), 3);
        equal(stack.pop(), 2);
        equal(stack.pop(), 1);
        ok(stack.isEmpty())
    });
});