#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var im      = require('imagemagick');
var gm      = require('gm');

var ip_address = process.env.OPENSHIFT_NODEJS_IP;
var port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = express();
var server = http.createServer(app);


app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/test', function(req, res){
    gm('/images/7lRgXhS3Alc.png')
        .colorize(200, 200, 256)
        .resize(343, 257)
        .autoOrient()
        .write(res, function (err) {
            if (err){
                console.log(err);
            }

        });
    res.send('Hello World');
});

server.listen(port, ip_address);
