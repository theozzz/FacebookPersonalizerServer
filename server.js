#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var request = require('request');
var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var im      = require('imagemagick');
var gm      = require('gm');

var ip_address = process.env.OPENSHIFT_NODEJS_IP;
var port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = express();
var server = http.createServer(app);

var imgArray;
var imgNameArray;


app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/test', function(req, res){
    console.log(req.query);
    /*im.convert(['./images/origin-sprite.png','-fill', 'red', '-tint', '100%', 'kittens-small.png'],
        function(err, stdout){
            if (err) throw err;
            console.log('stdout:', stdout);
        });
    var img = fs.readFileSync('./kittens-small.png');
    res.writeHead(200, {'Content-Type' : 'image/png' });
    res.end(img, 'binary');*/

});

app.post('/colorize-icons', function(req, res){
    var desiredColor = req.body.desired_color;
    for (var i in imgNameArray) {
        im.convert(['./uploaded-images/' + imgNameArray[i], '-fill', 'red', '-tint', '100%', imgNameArray[i] + '-red.png'],
            function(err, stdout){
                if (err) throw err;
            });
    }

});

app.post('/set-img', function(req, res){
    imgArray = req.body.img_array;
    for (var i in imgArray){
        var imgName = imgArray[i].split('/').pop();
        imgNameArray.push(imgName);
        download(imgArray[i], './uploaded-images/' + imgName, function(){
        });
    }
});

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

server.listen(port, ip_address,function(){
    console.log('server listening');
    var img="new_image.png";
    download('https://fbstatic-a.akamaihd.net/rsrc.php/v2/yu/r/PB0WpbyXBBt.png', 'google.png', function(){
        console.log('done');
    })
    im.convert(['./images/origin-sprite.png','-fill', 'red', '-tint', '100%', 'kittens-small.png'],
        function(err, stdout){
            if (err) throw err;
            console.log('stdout:', stdout);
        });

});
