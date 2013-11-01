var $ = require('../../lib/base/__asserters'),
    $stack = require('../../lib/patterns/stack');

exports['create'] = function (test) {
    test.expect(1);
    test.ok($stack());
    test.done();
};

exports['methods'] = function (test) {
    test.expect(7);

    var stack = $stack();
    test.ok(stack.isEmpty());

    stack.push(1).push(2).push(3);
    test.ok(!stack.isEmpty());

    stack.clear();
    test.ok(stack.isEmpty());

    stack.push(1).push(2).push(3);
    test.equal(stack.pop(), 3);
    test.equal(stack.pop(), 2);
    test.equal(stack.pop(), 1);
    test.ok(stack.isEmpty())

    test.done();
};