require('../wait');
require('should');

describe('wait', function() {
    it('should run the callback after 100 ms (passing a number).', function(done) {
        var me = '',
            cb = function() { me = 'elving'; };

        wait(100, cb);

        setTimeout(function() {
            me.should.equal('elving');
            done();
        }, 100);
    });

    it('should run the callback after 1 second (passing a string).', function(done) {
        var me = '',
            cb = function() { me = 'ELVING'; };

        wait('1 second', cb);

        setTimeout(function() {
            me.should.equal('ELVING');
            done();
        }, 1000);
    });
});

describe('repeat', function() {
    it('should run the callback every 100 ms (passing a number).', function(done) {
        var count = 0,
            interval = '',
            cb = function() { count += 1; };

        interval = repeat(100, cb);

        setTimeout(function() {
            clearInterval(interval);
            count.should.eql(4);
            done();
        }, 500);
    });

    it('should run the callback every second (passing a string).', function(done) {
        var count = 0,
            interval = '',
            cb = function() { count += 1; };

        interval = repeat('1s', cb);

        setTimeout(function() {
            clearInterval(interval);
            count.should.equal(4);
            done();
        }, 5000);
    });

    it('should run the callback immediately and every second (passing a string).', function(done) {
        var count = 0,
            interval = '',
            cb = function() { count += 1; };

        interval = repeat('1s', cb, true);

        setTimeout(function() {
            clearInterval(interval);
            count.should.equal(5);
            done();
        }, 5000);
    });
});

describe('until', function() {
    it('should run the callback when the condition is true.', function(done) {
        var count = 0,
            interval = '',
            condition = function() {
                return count > 4;
            };

        until(condition, done);

        for(var i = 0; i < 5; i++) {
            count += 1;
        }
    });

    it('should run the callback when the condition is true (passing an interval).', function(done) {
        var count = 0,
            interval = '',
            condition = function() {
                return count > 100;
            };

        until(condition, done, '1 sec');

        for(var i = 0; i <= 100; i++) {
            count += 1;
        }
    });
});

describe('clear', function() {
    it('should clear the timeout.', function(done) {
        var count = 0,
            timeout = 0;

        timeout = wait('1s', function() {
            count = 1;
        });

        wait(500, function() {
            clear(timeout);
        });

        wait('2s', function() {
            count.should.equal(0);
            done();
        });
    });

    it('should clear the timeout given an id.', function(done) {
        var count = 0;

        wait('1s', function() {
            count = 1;
        }, 'cool');

        wait(500, function() {
            clear('cool');
        });

        wait('2s', function() {
            count.should.equal(0);
            done();
        });
    });

    it('should clear the interval.', function(done) {
        var count = 0,
            interval = 0;

        interval = repeat(100, function() {
            count += 1;
        });

        wait(600, function() {
            clear(interval);
        });

        wait('1s', function() {
            count.should.equal(5);
            done();
        });
    });

    it('should clear the interval given an id.', function(done) {
        var count = 0;

        repeat(100, function() {
            count += 1;
        }, 'awesome-id');

        wait(400, function() {
            clear('awesome-id');
        });

        wait('1s', function() {
            count.should.equal(3);
            done();
        });
    });

    it('should clear the interval given an id and passing callBefore.', function(done) {
        var count = 0;

        repeat(100, function() {
            count += 1;
        }, 'awesome-id', true);

        wait(400, function() {
            clear('awesome-id');
        });

        wait('1s', function() {
            count.should.equal(4);
            done();
        });
    });

    it('should clear the interval passing callBefore.', function(done) {
        var count = 0,
            interval = 0;

        interval = repeat(100, function() {
            count += 1;
        }, true);

        wait(400, function() {
            clear(interval);
        });

        wait('1s', function() {
            count.should.equal(4);
            done();
        });
    });

    it('should clear the interval (using until() method).', function(done) {
        var count = 0,
            interval = 0,
            condition = function() {
                return count > 5;
            };

        repeat(100, function() {
            count += 1;
        });

        interval = until(condition, function() {
            count = 1;
        });

        wait(400, function() {
            clear(interval);
        });

        wait('1s', function() {
            count.should.equal(9);
            done();
        });
    });

    it('should clear the interval given an id (using until() method).', function(done) {
        var str = 'elving',
            condition = function() {
                return str === 'osom';
            };

        wait(500, function() {
            str = 'osom';
        });

        until(condition, function() {
            str = 'Elving';
        }, 'hip');

        wait(300, function() {
            clear('hip');
        });

        wait('1s', function() {
            str.should.equal('osom');
            done();
        });
    });

    it('should clear the interval given an id and passing a time (using until() method).', function(done) {
        var count = 0,
            condition = function() {
                return count > 5;
            };

        until(condition, function() {
            count = 1;
        }, '1s', 'hip');

        repeat('1s', function() {
            count += 1;
        });

        wait('4s', function() {
            clear('hip');
        });

        wait('5s', function() {
            count.should.equal(4);
            done();
        });
    });

    it('should clear all intervals and timeouts in array.', function(done) {
        var count = 0,
            timeout = 0;

        wait(100, function() {
            count = 1;
        }, 'id1');

        timeout = wait(300, function() {
            count = 3;
        });

        repeat('1s', function() {
            count = 5;
        }, 'id2');

        clear([timeout, 'id1', 'id2']);

        wait('3s', function() {
            count.should.equal(0);
            done();
        });
    });

    it('should clear all intervals and timeouts.', function(done) {
        var count = 0;

        wait(100, function() {
            count = 1;
        }, 'id1');

        repeat('1s', function() {
            count = 5;
        }, 'id2');

        clear();

        wait('2s', function() {
            count.should.equal(0);
            done();
        });
    });
});
