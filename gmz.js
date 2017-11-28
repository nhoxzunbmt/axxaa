var fs = require('fs')
    , gm = require('gm');
var utf8 = require('utf8');
var path = require('path');
var process = require("process");
var dir = require('node-dir');
var async = require('async');

// resize and remove EXIF varr sprofile data
var s = 'Anh em nghĩ chiếc YouTube Phone sẽ như thế nào?\n';
s = utf8.encode(s);


var images_folder = __dirname + '\\animals';
var i = 0;


dir.promiseFiles(images_folder)
    .then(function (files) {
        files.forEach(function (file) {
            var file_name = path.basename(file);

            var thumb = gm(file).resize(440, 320);
            var bg_merre = gm('bg.png')
                .composite(thumb)
                .geometry('+136+180')


                // .font("arialbd.ttf", 12)
                // .drawText(780, 220, s)
                // .drawText(800, 450, s)
                //.drawRectangle(10, 10, 20, 10)
                .encoding('Unicode')

                .write(file_name, function (err) {
                    if(err) console.log(err);
                    console.log('Done!');
                });

        })
    })
    .catch(function (e) {
        console.log(e);
    });







