/**
 * Created by matei.misarca on 29/01/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var slackBot = require('./slackBot');
var cors = require('cors');
var http = require('http');
var routes = require('./routes');

require('isomorphic-fetch');

var app = express();
app.set('port', process.env.PORT || 3040);
app.use(cors());
app.use(bodyParser.json());

// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// test route
app.get('/', function (req, res) {
    console.log("get ceva ", req.body)
    res.status(200).send('Hello world! get')
});

app.post('/', (req, res) => {
    console.log("post ceva ", req.body)
    res.status(200).send('Hello world! post')
});

/*app.post('/order', (req, res) => {
    console.log("order ceva ", req.body);
    res.status(200).send("ordered")
})*/

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.post('/hello', slackBot);

var dummy = {
    fromUser: "matei.misarca",
    product: "cafea",
    toUser: "radu.parachiv",
    location: "AICI"
}

fetch('http://localhost:8080/hubot/notify/order_coffee', {
    method: 'POST',
    body: JSON.stringify(dummy),
    mode: 'cors',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}).then((response) => {
    console.log("response ", response.status);
});

routes(app);

var server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Express server listening on port '.red + app.get('port'));
})

/*
 app.listen(port, function () {
 console.log('Slack bot listening on port ' + port);
 });
 */
