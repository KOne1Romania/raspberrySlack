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

fetch('http://81.196.110.34:4243/hubot/notify/order_coffee').then((response) => {
    console.log("response ", response);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});
