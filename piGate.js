var rpio = require('rpio');
var STEP_COUNT = 5000; // steps need to open/close fully.

class PiGate {
    constructor(pulsePort, directionPort, enablePort, closed) {
        this.isTurning = false;
        this.closed = closed || false;
        this.pulsePort = pulsePort;
        this.directionPort = directionPort;
        this.enablePort = enablePort;

        rpio.open(this.pulsePort, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.directionPort, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.enablePort, rpio.OUTPUT, rpio.HIGH);
    }

    open() {
        console.log('opening ...');
        if (!this.closed || this.isTurning) return;
        this.closed = false;
        turnMotor(false, STEP_COUNT);
    }

    close() {
        console.log('closing ...');
        if (this.closed || this.isTurning) return;
        this.closed = true;
        turnMotor(true, STEP_COUNT)
    }

    turnMotor(dir, steps) {
        this.isTurning = true;
        rpio.write(this.directionPort, dir ? rpio.HIGH : rpio.LOW);
        let i = steps;
        console.log('started turning', 'steps', i, 'dir', dir);
        while (i--) {
            rpio.write(this.pulsePort, rpio.HIGH);
            rpio.msleep(1);
            rpio.write(this.pulsePort, rpio.LOW);
            rpio.msleep(1);
        }
        console.log('done turning');
        this.isTurning = false;
    }
}

module.exports = PiGate;