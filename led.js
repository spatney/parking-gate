var rpio = require('rpio');

class Led {
    constructor(port) {
        this.port = port;
    }

    blink(times) {
        rpio.open(this.port, rpio.OUTPUT, rpio.LOW);
        for (var i = 0; i < times; i++) {
            rpio.write(12, rpio.HIGH);
            rpio.sleep(1);
            rpio.write(12, rpio.LOW);
            rpio.msleep(500);
        }
    }

    state(on){
        rpio.open(this.port, rpio.OUTPUT, on);
    }

    pwm(dutyCycle){
        rpio.open(this.port, rpio.PWM);
        rpio.pwmSetClockDivider(64);  // 300kHz
        rpio.pwmSetRange(this.port, 1024);
        rpio.pwmSetData((this.port, 1024 * dutyCycle) | 0);
    }
}