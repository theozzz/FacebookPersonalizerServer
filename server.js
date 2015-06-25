#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var request = require('request');
var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var im      = require('imagemagick');
var gm      = require('gm');
var async   = require('async');

var ip_address = process.env.OPENSHIFT_NODEJS_IP;
var port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = express();
var server = http.createServer(app);

var imgArray;
var imgNameArray = [];


app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
});

/******* PASTE **************/
/*fs.readFile(imgNameArray[i], function(err, data){
    if (err) throw err;
    var base64Buffer = data.toString('base64');
    console.log(base64Buffer);
});*/
/*
 app.post('/set-img', function(req, res){
 imgArray = req.body.img_array;
 for (var i in imgArray){
 var imgName = imgArray[i].split('/').pop();
 imgNameArray.push(imgName);
 download(imgArray[i], './uploaded-images/' + imgName, function(){
 });
 }
 for (var i in imgNameArray) {
 im.convert(['./uploaded-images/' + imgNameArray[i], '-fill', 'red', '-tint', '100%', imgNameArray[i]],
 function (err, stdout) {
 if (err) throw err;
 });
 }

 });*/


function colorizeIcons(callback){
    var isDone = 0;
    console.log('in colorize-icons');
    for (var i= 0; i < imgNameArray.length; i++){
        im.convert(['./uploaded-images/' + imgNameArray[i], '-fill', 'red', '-tint', '100%', './colorized-images/' + imgNameArray[i]],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                console.log(imgNameArray[i] + ' converted');
                if(++isDone == collection.length()){
                    callback();
                }
            });
    }
}

app.post('/colorize-icons', function(req, res){
    var desiredColor = req.body.desired_color;
    colorizeIcons(function(err){
        console.log('done');
    });

});



app.post('/set-img', function(req, res){
    imgArray = req.body.img_array;
    for (var i in imgArray) {
        var imgName = imgArray[i].split('/').pop();
        imgNameArray[i] = imgName;
        download(imgArray[i], './uploaded-images/' + imgName, function () {

        });
    }



            /*function(callback){
             console.log('in fonction3');
             for (var i in imgNameArray) {
             fs.readFile(imgNameArray[i], function (err, data) {
             if (err) throw err;
             var base64Buffer = data.toString('base64');
             console.log(base64Buffer);
             callback();
             });
             }

             }*/
       /* ], function (err, result) {
            // result now equals 'done'
            console.log("Final");
        });
    }*/


});
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        /*console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);*/

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

server.listen(port, ip_address,function(){
    console.log('server listening');



});
