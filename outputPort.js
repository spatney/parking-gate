var rpio = require('rpio');

class OutputPort {
    constructor(port) {
        console.log('OutputPort pin', port)
        this.port = port;
    }

    state(on) {
        rpio.open(this.port, rpio.OUTPUT, on ? rpio.HIGH : rpio.LOW);
    }

    pwm(dutyCycle) {
        rpio.open(this.port, rpio.PWM);
        rpio.pwmSetClockDivider(64);  // 300kHz
        rpio.pwmSetRange(this.port, 1024);
        rpio.pwmSetData((this.port, 1024 * dutyCycle) | 0);
    }
}

module.exports = OutputPort;