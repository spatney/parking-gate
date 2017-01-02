var rpio = require('rpio');

class Relay {
    constructor(port) {
        console.log('Relay', port)
        this.port = port;
        rpio.open(this.port, rpio.OUTPUT, rpio.LOW);
    }

    state(on) {
        rpio.write(this.port, on ? rpio.HIGH : rpio.LOW);
    }
}

module.exports = Relay;