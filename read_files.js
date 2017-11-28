var dir = require('node-dir');
var path = require( 'path' );
//var __dirname = 'images/';
//console.log(__dirname);
var images_folder = __dirname + '\\animals';
dir.promiseFiles(images_folder)
    .then(function (files) {
        console.log(files);

    })
    .catch(function (e) {
        console.log(e);
    });