(function () {

    var root = this;

    var isSeconds = /(seconds?|secs?|s)/i,
        isMinutes = /(minutes?|mins?|m)/i,
        isHours = /(hours?|hrs?|h)/i;

    var isNumber = function (value) {
        return Object.prototype.toString.call(value) == '[object Number]';
    };

    var parseTime = function (value) {
        value  = value.split(' ');

        var number = 0,
            unit = '';

        if (value.length > 1) {
            number = parseFloat(value[0]);
            unit = value[1];
        } else {
            number = parseFloat(value);

            if (isSeconds.test(value)) {
                unit = 'seconds';
            } else if (isMinutes.test(value)) {
                unit = 'minutes';
            } else if (isHours.test(value)) {
                unit = 'hours';
            }
        }

        if (isSeconds.test(unit)) {
            return number * 1000;
        } else if (isMinutes.test(unit)) {
            return number * 60000;
        } else if (isHours.test(unit)) {
            return number * 3600000;
        } else {
            return number;
        }
    };

    root.wait = function(time, callback) {
        time = isNumber(time) ? time : parseTime(time);
        return setTimeout(callback, time);
    };

    root.repeat = function(time, callback, callBefore) {
        time = isNumber(time) ? time : parseTime(time);
        callBefore = callBefore || false;

        if (callBefore) callback();
        return setInterval(callback, time);
    };

})();
