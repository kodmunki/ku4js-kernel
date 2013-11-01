var $ = require('../../lib/base/__asserters'),
    $queue = require('../../lib/patterns/queue');

exports['create'] = function (test) {
    test.expect(1);
    test.ok($queue());
    test.done();
};

exports['methods'] = function (test) {
    test.expect(7);

    var queue = $queue();
    test.ok(queue.isEmpty());

    queue.enqueue(1).enqueue(2).enqueue(3);
    test.ok(!queue.isEmpty());

    queue.clear();
    test.ok(queue.isEmpty());

    queue.enqueue(1).enqueue(2).enqueue(3);
    test.equal(queue.dequeue(), 1);
    test.equal(queue.dequeue(), 2);
    test.equal(queue.dequeue(), 3);
    test.ok(queue.isEmpty())

    test.done();
};