var rpio = require('rpio');

class Relay {
    constructor(port) {
        console.log('Relay', port)
        this.port = port;
        rpio.open(this.port, rpio.OUTPUT, false);
    }

    state(on){
        rpio.write(this.port, on);
    }
}

module.exports = Relay;