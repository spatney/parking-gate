var rpio = require('rpio');

class StepperMotor {
    constructor(m1, m2, m3, m4) {
        this.index = 0
        this.sequence = [1, 8, 4, 2];
        this.m1 = m1 || 11;
        this.m2 = m2 || 12;
        this.m3 = m3 || 13;
        this.m4 = m4 || 15;

        console.log('ports', 'm1', m1, 'm2', m2, 'm3', m3, 'm4', m4);

        rpio.open(this.m1, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.m2, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.m3, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.m4, rpio.OUTPUT, rpio.LOW);
    }

    clockwise(steps) {
        steps = steps || 1;
        for (let i = 0; i < steps; i++) {
            this.index = this.index == 0 ? 3 : this.index -= 1;
            this.setPattern(this.sequence[this.index]);
            rpio.msleep(2);
        }
    }

    antiClockwise(steps) {
        steps = steps || 1;
        for (let i = 0; i < steps; i++) {
            this.index = this.index == 3 ? 0 : this.index += 1;
            this.setPattern(this.sequence[this.index]);
            rpio.msleep(2);
        }
    }

    setPattern(i) {
        switch (i) {
            case 1:
                console.log('case', 1);
                rpio.write(this.m1, rpio.HIGH);
                rpio.write(this.m2, rpio.LOW);
                rpio.write(this.m3, rpio.LOW);
                rpio.write(this.m4, rpio.LOW);
                break;
            case 2:
                console.log('case', 2);
                rpio.write(this.m1, rpio.LOW);
                rpio.write(this.m2, rpio.HIGH);
                rpio.write(this.m3, rpio.LOW);
                rpio.write(this.m4, rpio.LOW);
                break;
            case 4:
                console.log('case', 4);
                rpio.write(this.m1, rpio.LOW);
                rpio.write(this.m2, rpio.LOW);
                rpio.write(this.m3, rpio.HIGH);
                rpio.write(this.m4, rpio.LOW);
                break;
            case 8:
                console.log('case', 8);
                rpio.write(this.m1, rpio.LOW);
                rpio.write(this.m2, rpio.LOW);
                rpio.write(this.m3, rpio.LOW);
                rpio.write(this.m4, rpio.HIGH);
                break;
        }
    }
}

module.exports = StepperMotor;