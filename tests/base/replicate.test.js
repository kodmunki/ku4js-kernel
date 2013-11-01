var replicate = require('../../lib/base/__replicate'),
    array = [1,2,3],
    date = new Date(),
    obj = {"1":1,"2":2,"3":3};

exports['replicate'] = function (test) {
    test.expect(5);
    test.ok(_replicate(null) ==  null);
    test.ok(_replicate(undefined) == undefined);
    test.ok(array[0] == _replicate(array)[0]);
    test.ok(date.valueof == _replicate(date).valueof);
    test.ok(obj["1"] == _replicate(obj)["1"]);
    test.done();
};
