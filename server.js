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
    im.convert(['./images/origin-sprite.png','-fill', 'red', '-tint', '100%', 'kittens-small.png'],
        function(err, stdout){
            if (err) throw err;
            console.log('stdout:', stdout);
        });
    var img = fs.readFileSync('./kittens-small.png');
    res.writeHead(200, {'Content-Type' : 'image/png' });
    res.end(img, 'binary');
});

server.listen(port, ip_address,function(){
    console.log('server listening');
    var img="new_image.png";

});
