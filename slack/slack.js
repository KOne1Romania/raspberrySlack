/**
 * Created by matei.misarca on 29/01/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var slackBot = require('./slackBot');

require('isomorphic-fetch');

var app = express();
var port = process.env.PORT || 3040;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

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

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});
