var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/breakout-app/dist'));
app.use(session({ secret: "SuperSecret" }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/breakout_2_2018');

require('./server/config/mongoose.js');

var routes = require('./server/config/routes.js');
routes(app);



app.listen(8000, function () {
    console.log('listening on port 8000');
})