var OutputPort = require('./outputPort');
var Relay = require('./relay');
var Gate = require('./piGate');
var RGBLed = require('./rgbLed');

var vacuum = new Relay(16);
var water = new Relay(36);
var jet = new Relay(37);
var gate = new Gate(38, 40, 33); // (pulse, direction, enable)
var ledStrip = new RGBLed(12, 32, 35); // (red, green, blue)

class DeviceController {
    constructor(socket) {
        this.socket = socket;
    }

    execCommand(command) {
        switch (command.device) {

            case 'gate':
                const state = command.state;
                if (state) {
                    console.log('gate open');
                    gate.open();
                } else {
                    console.log('gate close');
                    gate.close();
                }
                break;

            case 'water':
                console.log('water pulse on');
                water.state(true);
                setTimeout(() => {
                    console.log('water pulse off');
                    water.state(false);
                }, 50);
                break;
            case 'jet':
                console.log('jet pulse on');
                jet.state(true);
                setTimeout(() => {
                    console.log('jet pulse off');
                    jet.state(false);
                }, 50);
                break;
            case 'vacuum':
                console.log('vacuum pulse on');
                vacuum.state(true);
                setTimeout(() => {
                    console.log('vacuum pulse off');
                    vacuum.state(false);
                }, 50);
                break;

            case 'rgb':
                let red = command.red;
                let green = command.green;
                let blue = command.blue;

                console.log(`rgb -> ${red},${green},${blue}`);

            ledStrip.setColor(red, green, blue);
            break;

            default: console.error('command unknown', JSON.stringify(command));
        }
    }
}

module.exports = DeviceController;