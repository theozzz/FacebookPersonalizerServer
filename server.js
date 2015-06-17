#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var im      = require('imagemagick');

var ip_address = process.env.OPENSHIFT_NODEJS_IP;
var port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = express();
var server = http.createServer(app);


app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/test', function(req, res){
    im.readMetadata('images/7lRgXhS3Alc.png', function(err, metadata){
        if (err) throw err;
        console.log('Shot at '+metadata.exif.dateTimeOriginal);

    });
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.send('Hello World');
});

server.listen(port, ip_address);
