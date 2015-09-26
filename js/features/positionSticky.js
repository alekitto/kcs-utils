;
(function (docElement) {
    var element = document.createElement('div');
    var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];

    for (var i = 0, l = prefixTestList.length; i < l; i++) {
        element.setAttribute('style', 'position: ' + prefixTestList[i] + 'sticky; top: 10px;');
        if (window.getComputedStyle(element).position.match('sticky'))
            return;
    }
    docElement.className += " no-sticky";
})(document.documentElement);
