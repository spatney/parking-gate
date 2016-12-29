sleep = require('sleep');
class Stepper {
    constructor(){
        this.index=0
        this.pattern1 =[ 1, 8, 4, 2 ];
    }

    setPattern(i) {
        switch (i) {
            case 1: console.log('case', 1); break;
            case 2: console.log('case', 2); break;
            case 4: console.log('case', 4); break;
            case 8: console.log('case', 8); break;
        }
    }

    stepRight() {
        this.index = this.index == 3 ? 0 : this.index += 1;
        this.setPattern(this.pattern1[this.index]);
        sleep.usleep(2000);
    }
}

module.exports = Stepper;