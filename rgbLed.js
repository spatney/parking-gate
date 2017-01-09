var rpio = require('rpio');
var OutputPort = require('./outputPort');

class RGBLed{
    constructor(red, green, blue){
        console.log('RGBLed ports', red, green, blue);
        this.red = new OutputPort(red);
        this.green = new OutputPort(green);
        this.blue = new OutputPort(blue);
    }

    setColor(r,g,b){
        console.log('setColor', r, g, b);
        this.red.pwm(r);
        this.green.pwm(g);
        this.blue.pwm(b);
    }
}