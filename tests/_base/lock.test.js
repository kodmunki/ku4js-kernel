$(function(){
    function notOk(s, m) {equal(!!s,false,m);}

    module("lock");

    test('create', function () {
        var lock1 = $.lock(),
            lock2 = $.lock(false),
            lock3 = $.lock(true);

        expect(3);
        ok(!lock1.isLocked());
        ok(!lock2.isLocked());
        ok(lock3.isLocked());
    });

    var lock = $.lock();
    test('lock', function () {
        lock.unlock().lock();

        expect(1);
        ok(lock.isLocked());
    });

    test('unlock', function () {
        lock.lock().unlock();

        expect(1);
        ok(!lock.isLocked());
    });
})