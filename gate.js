var rpio = require('rpio');

class Gate {
    constructor(openPort, closePort) {
        this.openPort = openPort;
        this.closePort = closePort;

        rpio.open(this.openPort, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.closePort, rpio.OUTPUT, rpio.LOW);
    }

    open(){
        rpio.write(this.openPort, rpio.HIGH);
        rpio.msleep(500);
        rpio.write(this.openPort, rpio.LOW);
    }

    close(){
        rpio.write(this.closePort, rpio.HIGH);
        rpio.msleep(500);
        rpio.write(this.closePort, rpio.LOW);
    }
}

module.exports = Gate;