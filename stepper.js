module.exports = function () {
    var sleep = require('sleep');
    var index = 0;

    function setPattern(i) {
        switch (i) {
            case 1: console.log('case', 1); break;
            case 2: console.log('case', 2); break;
            case 4: console.log('case', 4); break;
            case 8: console.log('case', 8); break;
        }
    }

    function stepRight() {
        index = index == 3 ? 0 : index += 1;

        SetPattern(pattern1[index]);
        sleep.usleep(2000);
    }
}