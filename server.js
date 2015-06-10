#!/bin/env node
//  OpenShift sample Node application
//var express = require('express');
//var fs      = require('fs');
//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";


//Create a server
app.listen(port, function() {
   console.log("Listening on " + port);
});