var sleep = require('sleep');
var rpio = require('rpio');

class Stepper {
    constructor() {
        this.index = 0
        this.pattern1 = [1, 8, 4, 2];
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

    blink() {
        /*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
        rpio.open(14, rpio.OUTPUT, rpio.LOW);

        /*
         * The sleep functions block, but rarely in these simple programs does one care
         * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
         */
        for (var i = 0; i < 5; i++) {
            /* On for 1 second */
            rpio.write(12, rpio.HIGH);
            rpio.sleep(1);

            /* Off for half a second (500ms) */
            rpio.write(12, rpio.LOW);
            rpio.msleep(500);
        }
    }
}

module.exports = Stepper;