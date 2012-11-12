(function () {

    var root = this;

    var toString = Object.prototype.toString;

    var ids = {};

    var isSeconds = /(seconds?|secs?|^([0-9]+)s)/i,
        isMinutes = /(minutes?|mins?|^([0-9]+)m)/i,
        isHours = /(hours?|hrs?|^([0-9]+)h)/i;

    var isNumber = function (value) {
        return toString.call(value) == '[object Number]';
    };

    var isString = function (value) {
        return toString.call(value) == '[object String]';
    };

    var isBoolean = function (value) {
        return toString.call(value) == '[object Boolean]';
    };

    var isArray = function (value) {
        return toString.call(value) == '[object Array]';
    };

    var isTime = function (value) {
        var timeTest = /(seconds?|secs?|^([0-9]+)s|minutes?|mins?|^([0-9]+)m|hours?|hrs?|^([0-9]+)h)/i;
        return isNumber(value) || timeTest.test(value);
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

    root.wait = function(time, callback, id) {
        var timeout = 0;

        time = isNumber(time) ? time : parseTime(time);
        timeout = setTimeout(callback, time);

        if (id && isString(id)) ids[id] = timeout;

        return timeout;
    };

    root.repeat = function(time, callback, id, callBefore) {
        var interval = 0;

        time = isNumber(time) ? time : parseTime(time);

        if (arguments.length === 3) {
            if (isBoolean(id)) {
                callBefore = id;
            }
        }

        if (callBefore) callback();
        interval = setInterval(callback, time);

        if (id && isString(id)) ids[id] = interval;

        return interval;
    };

    root.until = function(condition, callback, time, id) {
        if (condition()) {
            callback();
            return;
        }

        if (arguments.length === 3) {
            if (isTime(time) || isNumber(time)) {
                time = time;
                time = isNumber(time) ? time : parseTime(time);
            } else {
                id = time;
                time = 100;
            }
        } else if (arguments.length === 4) {
            time = time || 100;
            time = isNumber(time) ? time : parseTime(time);
        } else {
            time = 100;
        }

        var interval = root.repeat(time, function() {
            if (condition()) {
                root.clear(interval);
                callback();
            }
        }, id, false);

        return interval;
    };

    _clear = function(id) {
        clearInterval(id);
        clearTimeout(id);
    };

    root.clear = function(id) {
        var _ids = [],
            _id = '';

        if (arguments.length === 0) {
            for(id in ids) {
                _clear(ids[id]);
                delete ids[id];
            }
        } else if (isArray(id) || isString(id)) {
            _ids = isArray(id) ? id.slice() : [id];
            for(var x = 0; x < _ids.length; x++) {
                _id = _ids[x];

                if (isString(_id)) {
                    _clear(ids[_id]);
                    delete ids[_id];
                } else {
                    _clear(_id);
                }
            }
        } else {
            _clear(id);
        }
    };

})();
