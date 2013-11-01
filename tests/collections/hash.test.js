var $ = require('../../lib/collections/hash'),
    hash = $();

exports['create'] = function (test) {
    test.expect(1);
    test.ok($());
    test.done();
};

exports['add'] = function (test) {
    test.expect(5);
    test.ok(hash.isEmpty());
    hash.add("one", 1);
    test.equal(1, hash.count(), "add(\"one\",1)");
    hash.add("two", 2);
    test.equal(2, hash.count(), "add(\"two\",2)");
    hash.add("two", 3);
    test.equal(2, hash.count(), "add duplicate");
    test.equal(2, hash.find("two"), "find(\"two\")");
    test.done();
};

exports['meld'] = function (test) {
    test.expect(2);
    hash.meld($({"three":3}));
    test.equal(hash.count(), 3,  "meld");
    hash.meld({"three":4});
    test.equal(hash.findValue("three"), 3, "meld duplicate");
    test.done();
};

exports['merge'] = function (test) {
    test.expect(2);
    hash.merge({"three":4});
    test.equal(4, hash.findValue("three"), "merge duplicate");
    hash.merge($({"three":5}));
    test.equal(5, hash.findValue("three"), "merge duplicate");
    test.done();
};

exports['containsKey'] = function (test) {
    test.expect(1);
    test.ok(hash.containsKey("one"), "containsKey(\"one\")");
    test.done();
};

exports['remove'] = function (test) {
    test.expect(1);
    hash.remove("one");
    test.equal(2, hash.count(), "remove()");
    test.done();
};

exports['update'] = function (test) {
    test.expect(3);
    hash.update("two", 3);
    test.equal(2, hash.count(), "update two");
    test.equal(3, hash.find("two"), "find(\"two\")");
    test.equal(2, hash.count());
    test.done();
};

exports['clear'] = function (test) {
    test.expect(1);
    hash.clear();
    test.equal(0, hash.count(), "clear()");
    test.done();
};