sleep = require('sleep');
class Stepper {
    constructor(){this.index=0}

    setPattern(i) {
        switch (i) {
            case 1: console.log('case', 1); break;
            case 2: console.log('case', 2); break;
            case 4: console.log('case', 4); break;
            case 8: console.log('case', 8); break;
        }
    }

    stepRight() {
        index = index == 3 ? 0 : index += 1;

        setPattern(pattern1[index]);
        sleep.usleep(2000);
    }
}

module.exports = Stepper;