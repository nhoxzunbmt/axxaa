var gm = require('gm');
var utf8 = require('utf8');
var path = require('path');
var dir = require('node-dir');
var videoshow = require('videoshow');

var ffmpeg = require('@ffmpeg-installer/ffmpeg');
var ffprobe = require('@ffprobe-installer/ffprobe');

videoshow.ffmpeg.setFfmpegPath(ffmpeg.path);
videoshow.ffmpeg.setFfprobePath(ffprobe.path);

const IMAGE_ROOT = __dirname + '\\input\\images';
const AUDIO_ROOT = __dirname + '\\input\\audio';
const FONT_ROOT = __dirname + '\\input\\fonts';

const bg_image = IMAGE_ROOT + '\\bg\\bg.png';


var images_folder = IMAGE_ROOT + '\\animals';

var s = 'Anh em nghĩ chiếc YouTube Phone sẽ như thế nào?\n';
s = utf8.encode(s);



dir.promiseFiles(images_folder)
    .then(function (files) {
        files.forEach(function (file) {
            var file_name = path.basename(file);
            console.log('-----------------------');
            console.log(file_name);
            hello_file(file_name);
            resize(file);
        })
    })
    .then(function () {

        var images = [
            {
                path: __dirname + '/result_merge_bg_resize_animals_hero_fennec2.jpg'
            }, {
                path: __dirname + '/result_merge_bg_resize_animals_hero_panda.jpg',
                loop: 5
            }
        ];
        //make_video(images);
    })
    .catch(function (e) {
        console.log(e);
    });

function hello_file(file) {
    console.log('This is ' + file);
}


function resize(file) {
    var base_name = path.basename(file);
    var file_name = 'resize/' + base_name;
    gm(file).resize(440, 320).write(file_name, function (err) {
        if (err) console.log(err);
        console.log('Done resize!');
        //merge_bg(file_name);
    });
}


function merge_bg(file) {
    var base_name = path.basename(file);
    var file_name = 'merge_bg_' + base_name;
    gm('bg.png')
        .composite(file)
        .geometry('+136+180')
        .write(file_name, function (err) {
            if (err) console.log(err);
            console.log('Done merge_bg!');
            add_text(file_name);
        });
}

function add_text(file) {
    var file_name = 'result_' + path.basename(file);
    gm(file)
        .font("arialbd.ttf", 12)
        .drawText(780, 220, s)
        .drawText(800, 450, s)
        .encoding('Unicode')
        .write(file_name, function (err) {
            if (err) console.log(err);
            console.log('Done add_text!');
        });
}


function make_video(images) {
    var audio = __dirname + '/song.mp3';
    var audioParams = {
        fade: true,
        delay: 2 // seconds
    };
    var videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
    };
    var logo = __dirname + '/logo.png';
    var logoParams = {
        start: 5,
        end: 20,
        xAxis: 20,
        yAxis: 20
    };
    images.forEach(function (image) {

        videoshow(image, videoOptions)
            .audio(audio, audioParams)
            //.logo(logo,logoParams)
            .save('video.mp4')
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                console.error('Error:', err)
                console.error('ffmpeg stderr:', stderr)
            })
            .on('end', function (output) {
                console.error('Video created in:', output)
            })

    });

}


function merge_videos() {
    ffmpeg()
        .mergeAdd('/path/to/input1.avi')
        .mergeAdd('/path/to/input2.avi');
}






