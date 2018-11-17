var express = require('express');
//var http = require('http');
//var https = require('https');
var path = require('path');
//var fs = require('fs');
//var mime = require('mime');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');

//var cookieParser = require('cookie-parser');
//var session = require('express-session');

//var vcapServices = require('vcap_services');
//var uuid = require('uuid');
//var env = require('./controller/envV2.json');
//var sessionSecret = env.sessionSecret;
var appEnv = cfenv.getAppEnv();
var app = express();
var busboy = require('connect-busboy');
app.use(busboy());

//app.use(cookieParser(sessionSecret));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('appName', 'agrichain-ethereum-restapi');
app.set('port', appEnv.port);

app.set('views', path.join(__dirname + '/HTML'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/HTML'));
app.use(bodyParser.json());


app.use('/', require("./controller/restapi/router"));


if (cfenv.getAppEnv().isLocal == true){ 
    var server = app.listen(app.get('port'), function() {
        console.log('Listening locally on port %d', server.address().port);
    }); 
}else{ 
    var server = app.listen(app.get('port'), function() {
        console.log('Listening remotely on port %d', server.address().port);
    }); 
}