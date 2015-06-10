#!/bin/env node
//  OpenShift sample Node application
//var express = require('express');
//var fs      = require('fs');
//Lets require/import the HTTP module
/*var http = require('http');
var express = require('express');
var app = express();




//Create a server
app.listen(port, function() {
   console.log("Listening on " + port);
});*/

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port, ip);
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');