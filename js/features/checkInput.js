;
define('input-checker', function() {
    var createInputElement = function(type) {
        var input = document.createElement('input');
        input.setAttribute('type', type);
        return input;
    };

    return {
        checkInput: function (type, input) {
            if (typeof input === 'undefined') {
                input = createInputElement(type);
            }

            return input.type === type;
        },
        createInputElement: createInputElement
    };
});
