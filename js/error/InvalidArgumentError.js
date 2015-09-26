;
define('error/invalid-argument-error', function() {
    /**
     * Define an invalid argument error
     *
     * @param {string} param    - The invalid parameter name
     * @param {string} message  - The error message
     *
     * @constructor
     */
    var InvalidArgumentError = function(param, message) {
        Error.call(this);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = [
            "The argument",
            param,
            "is invalid [",
            message,
            "]"
        ].join(" ");

        return this;
    };

    InvalidArgumentError.prototype = new Error();

    return {
        create: function(param, message) {
            return new InvalidArgumentError(param, message);
        }
    };
});
