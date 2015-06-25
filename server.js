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

function downloadSprites(collection, callback) {
    var isDone = 0;
    for (var i= 0; i < collection.length; i++) {
        var imgName = collection[i].split('/').pop();
        imgNameArray[i] = imgName;
        download(collection[i], './uploaded-images/' + imgName, function(err){
            if (err) {
                callback(err);
                return;
            }
            if(++isDone == collection.length) {
                callback();
            }
        });
    }
}

/*function convertIconsToB64(collection, callback) {
    var isDone = 0;
    for (var i = 0; i < collection.length; i++) {
        fs.readFile('./colorized-images/' + collection[i], function (err, data) {
            if (err) {
                callback(err);
            }
            var base64Buffer = new Buffer(data).toString('base64');
            console.log(base64Buffer);
            if (++isDone == collection.length) {
                callback();
            }
        });
    }
}*/
function convertIconsToB64(collection, callback) {
    var isDone = 0;
    for (var i = 0; i < collection.length; i++) {
        console.log(collection[i]);
        var buffer = fs.readFile('./colorized-images/' + collection[i], function (err, data) {
            console.log(data);
            if (err) {
                callback(err);
            }

            if (++isDone == collection.length) {
                callback();
            }
        });
        var base64Buffer = new buffer.toString('base64');
        console.log(base64Buffer);
    }
}
function colorizeIcons(collection, callback){
    var isDone = 0;
    for (var i= 0; i < collection.length; i++){
        im.convert(['./uploaded-images/' + collection[i], '-fill', 'red', '-tint', '100%', './colorized-images/' + collection[i]],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                if(++isDone == collection.length){
                    callback();
                }
            });
    }
}

app.post('/colorize-icons', function(req, res){
    var desiredColor = req.body.desired_color;
    colorizeIcons(imgNameArray, function(err){
        console.log('Icons colorized');
        convertIconsToB64(imgNameArray, function(err){
            console.log('Icons converted to B64');
        });
    });


});

app.post('/set-img', function(req, res){
    imgArray = req.body.img_array;
    downloadSprites(imgArray, function(err){
        console.log('Sprites downloaded');
    });
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
