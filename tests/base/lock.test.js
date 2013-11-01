var $ = require('../../lib/base/lock'),
    lock = $();

exports['create'] = function (test) {
    var lock1 = $(),
        lock2 = $(false),
        lock3 = $(true);

    test.expect(3);
    test.ok(!lock1.isLocked());
    test.ok(!lock2.isLocked());
    test.ok(lock3.isLocked());
    test.done();
};

exports['lock'] = function (test) {
    lock.unlock().lock();

    test.expect(1);
    test.ok(lock.isLocked());
    test.done();
};

exports['unlock'] = function (test) {
    lock.lock().unlock();

    test.expect(1);
    test.ok(!lock.isLocked());
    test.done();
};