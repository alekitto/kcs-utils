define('jquery-exists', ['jquery'], function(jQuery) {
    jQuery.fn.exists = function() {
        return $(this).length > 0;
    }
});
require(['jquery-exists'], function() {});
