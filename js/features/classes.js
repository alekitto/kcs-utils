;
(function(docElement) {
    var className = docElement.className;

    var reJS = new RegExp('(^|\\s)' + 'no-js(\\s|$)');
    className = className.replace(reJS, '$1' + 'js$2');

    // Check SVG support
    if (!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')) {
        className += " no-svg";
    }

    docElement.className = className;
})(document.documentElement);
