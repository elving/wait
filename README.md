# wait
Syntactic sugar for setTimeout and setInterval.

## wait(time, callback, id)

Sugar for setTimeout.

    wait(100, function(){
        // Do something in 100 milliseconds
    });

    wait('2s', function(){
        // Do something in 2 seconds
    });

    wait('2 minutes', function(){
        // Do something in 2 seconds
    }, 'awesomeId');

## repeat(time, callback, id, callBefore = false)

Sugar for setInterval.

If `callBefore` is true the callback will be executed before the interval.

    repeat(100, function() {
        // Do something every 100 milliseconds
    });

    repeat('1 min', function() {
        // Do something every minute
    }, 'awesomeId');

    repeat('1 min', function() {
        // Run immediately and every minute
    }, true);

    repeat('1 min', function() {
        // Run immediately and every minute
    }, 'awesomeId', true);

## until(condition, callback, interval = 100, id)

Runs the callback function when the condition is true. If you don't specify an interval the condition will be check every 100 milliseconds.

    var condition = function() {
        return 1 == 1;
    };

    until(condition, function() {
        // Do something when 1 == 1
    });

    until(condition, function() {
        // Check every second if 1 == 1 and do something.
    }, '1 second');

    until(condition, function() {
        // Check every second if 1 == 1 and do something.
    }, 150, 'coolId');

## clear

Syntactic sugar for clearInterval and clearTimeout

The `clear()` method can be used in 3 ways:

    // Will clear all intervals and timeouts that where created with an id
    clear();

    // Will clear a timeout or interval given an id.
    clear(id);

    // The id can be two things.
    var timeout = wait(100, callback);
    clear(timeout);

    wait(100, callback, 'awesome-id');
    clear('awesome-id');

    // Will clear all timeouts and intervals in an array.
    clear([timeout, 'awesome-id']);

## time

Time can be specified in various formats:

*If `time` is a number, it will be interpreted as milliseconds.*

`100`, `1 second`, `3 minutes`, `1 hour`, `3 secs`, `1 min`, `2 hrs`, `1s`, `3m`, `2h`

## Installation
    npm install waitjs

## Usage
    // nodejs
    require('wait');

    <!-- browser -->
    <script src="wait.js"></script>

## Tests
    npm test
