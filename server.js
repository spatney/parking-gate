var app = require('express')();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var OutputPort = require('./outputPort');
var Relay = require('./relay');
var Gate = require('./piGate');

var vacuum = new Relay(35);
var water = new Relay(36);
var jet = new Relay(37);
var gate = new Gate(38, 40, 33);

var led = new OutputPort(16); // Just for testing

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/gate', function (req, res) {
    console.log('gate', req.body);
    let state = req.body.state;
    if (state) {
        gate.open();
    } else {
        gate.close();
    }
    res.json({ echo: req.body });
})

app.post('/water', function (req, res) {
    console.log('water', req.body);
    water.state(true);
    setTimeout(() => { water.state(false) }, 50);
    res.json({ echo: req.body });
})

app.post('/jet', function (req, res) {
    console.log('jet', req.body);
    jet.state(true);
    setTimeout(() => { jet.state(false) }, 50);
    res.json({ echo: req.body });
})

app.post('/vacuum', function (req, res) {
    console.log('vacuum', req.body);
    vacuum.state(true);
    setTimeout(() => { vacuum.state(false) }, 50);
    res.json({ echo: req.body });
})

app.post('/led', function (req, res) { // Just for testing
    console.log('led', req.body);
    let blinks = req.body.blinks;
    setTimeout(() => { led.blink(blinks) }, 0);
    res.json({ echo: req.body });
});

server.listen(1337, function () {
    console.log('listening ....');
});