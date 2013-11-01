var $ = require('../../lib/base/__asserters'),
    $mediator = require('../../lib/patterns/mediator'),
    mediator = $mediator(),
    test1, test2, test3;

exports['create'] = function (test) {
    test.expect(1);
    test.ok($mediator());
    test.done();
};

exports['methods'] = function (test) {
    test.expect(10);
    mediator
        .subscribe("method.a", function(value){ test1 = value; }, null, "1")
        .subscribe("method.a", function(value){ test2 = value; }, null, "2")
        .subscribe("method.b", function(value){ test3 = value; }, null, "1");

    mediator.notify("value1");

    test.equal(test1, "value1");
    test.equal(test2, "value1");
    test.equal(test3, "value1");

    mediator.notify("value2", "method.b");

    test.equal(test1, "value1");
    test.equal(test2, "value1");
    test.equal(test3, "value2");

    //unsubscribe
    mediator.unsubscribe("method.a", "2");
    mediator.notify("value3");

    test.equal(test1, "value3");
    test.equal(test2, "value1");
    test.equal(test3, "value3");

    //clear
    test.ok(mediator.clear().isEmpty());
    test.done();
};