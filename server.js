var app = require('express')();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var StepperMotor = require('./stepper');
var Led = require('./led');
var Relay = requir('./relay');

var gateMotor = new StepperMotor(11, 12, 13, 15);
var led = new Led(16);
var relay = new Relay(18);

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/motor', function (req, res) {
    console.log('motor', req.body);
    let dir = req.body.dir;
    let steps = req.body.steps;

    if (dir) {
        gateMotor.clockwise(steps);
    } else {
        gateMotor.antiClockwise(steps);
    }
    res.json({ echo: req.body });
});

app.post('/led', function (req, res) {
    console.log('led', req.body);
    let blinks = req.body.blinks;
    led.blink(blinks);
    res.json({ echo: req.body });
});

app.post('/relay', function (req, res) {
    console.log('relay', req.body);
    let state= req.body.state;
    relay.state(state);
    res.json({ echo: req.body });
});

app.post('/ledAsync', function (req, res) {
    console.log('led', req.body);
    let blinks = req.body.blinks;
    setTimeout(() => { led.blink(blinks) }, 0);
    res.json({ echo: req.body });
});

app.post('/gate', function (req, res) {
    console.log('command ->', req.body.command);
    res.json({ echo: req.body.command })
});

server.listen(1337, function () {
    console.log('listening ....')
});