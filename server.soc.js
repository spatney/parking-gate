const SpiderSocket = require('spider-device');
const DeviceController = require('./deviceController');

const socket = new SpiderSocket({
    appId: '',
    uid: 'pi'
});

const deviceController = new DeviceController(socket);

socket.register(() => {
    console.log('registered');
    socket.on('command', command => {
        console.log(`command ${JSON.stringify(command)}`);
        deviceController.execCommand(command);
    });
});