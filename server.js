var app = require('express')();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var motor = require('./stepper');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/gate', function(req, res){
    console.log('command ->', req.body.command);
    new motor().stepRight();
    res.json({echo: req.body.command})
});

server.listen(1337, function(){
    console.log('listening ....')
})