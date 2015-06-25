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
function test(){
    console.log('hello world');
}

app.post('/colorize-icons', function(req, res){
    var desiredColor = req.body.desired_color;
    for (var i in imgNameArray) {
        /*im.convert(['./uploaded-images/' + imgNameArray[i], '-fill', 'red', '-tint', '100%', imgNameArray[i]],
            function (err, stdout) {
                if (err) throw err;
            });*/
        setTimeout(test, 1000);
        fs.readFile(imgNameArray[i], function(err, data){
            if (err) throw err;
            var base64Buffer = data.toString('base64');
            console.log(base64Buffer);
        });

        }
        //fs.writeFile("./colorized-images/Tk4r3ASHe9l.png", new Buffer(request.body.photo, "base64").toString(), function(err) {});

});
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

function colorizeImage(){

}
app.post('/set-img', function(req, res){
    imgArray = req.body.img_array;
    for (var i in imgArray) {
        async.waterfall([
            function (callback) {
                console.log('in fonction1');
                    var imgName = imgArray[i].split('/').pop();
                    imgNameArray.push(imgName);
                    download(imgArray[i], './uploaded-images/' + imgName, function () {
                        callback();
                    });


            },
            function (callback) {
                console.log('in fonction2');
                    im.convert(['./uploaded-images/' + imgNameArray[i], '-fill', 'red', '-tint', '100%', imgNameArray[i]],
                        function (err, stdout) {
                            if (err) throw err;
                        });
                    callback();
                    console.log('end of function2');

            },
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
        ], function (err, result) {
            // result now equals 'done'
            console.log("Final");
        });
    }


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
