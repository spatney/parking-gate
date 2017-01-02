function PostCode(deviceName, ip) {
    request = require('request-json');
    var client = request.createClient('https://sachiniofx.azurewebsites.net/');

    var postData = {
        data: {
            deviceName: deviceName,
            ip: ip
        }
    };
    client.post('api/heartbeat/', postData, function (err, res, body) {
        return console.log(res.statusCode);
    });
}

setTimeout(() => {
    console.log('getting external ip');
    var extIP = require('external-ip');

    var getIP = extIP({
        replace: true,
        services: ['http://ifconfig.co/x-real-ip', 'http://ifconfig.io/ip'],
        timeout: 600,
        getIP: 'parallel'
    });

    getIP(function (err, ip) {
        if (err) {
            throw err;
        }
        console.log(ip);
        PostCode('rpi', ip);
    });
}, 10000);