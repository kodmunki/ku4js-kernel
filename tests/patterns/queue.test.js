$(function(){
    function notOk(s, m) {equal(s,false,m);}

    module("queue");

    test('create', function (test) {
        expect(1);
        ok($.fifo());
    });

    test('methods', function (test) {
        expect(7);

        var queue = $.fifo();
        ok(queue.isEmpty());

        queue.enqueue(1).enqueue(2).enqueue(3);
        ok(!queue.isEmpty());

        queue.clear();
        ok(queue.isEmpty());

        queue.enqueue(1).enqueue(2).enqueue(3);
        equal(queue.dequeue(), 1);
        equal(queue.dequeue(), 2);
        equal(queue.dequeue(), 3);
        ok(queue.isEmpty());
    });
});