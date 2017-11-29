var gm = require('gm');
var utf8 = require('utf8');
var path = require('path');
var dir = require('node-dir');
var videoshow = require('videoshow');
var lodash = require('lodash');
var Promise = require('promise');
var Q = require("q");
var ffmpeg = require('fluent-ffmpeg');
var ffmpeg_install = require('@ffmpeg-installer/ffmpeg');
var ffprobe_install = require('@ffprobe-installer/ffprobe');
var colors = require('colors');

videoshow.ffmpeg.setFfmpegPath(ffmpeg_install.path);
videoshow.ffmpeg.setFfprobePath(ffprobe_install.path);

const IMAGE_ROOT = __dirname + '\\input\\images';
const AUDIO_ROOT = __dirname + '\\input\\audio';
const FONT_ROOT = __dirname + '\\input\\fonts';

const bg_image = IMAGE_ROOT + '\\bg\\bg.png';
const font_text = FONT_ROOT + "/arialbd.ttf";
const images_folder = IMAGE_ROOT + '\\animals';
const images_render = __dirname + '\\merge';
const images_resize = __dirname + '\\resize';
const video_temp = __dirname + '\\video_temp';


var s = 'Anh em nghĩ chiếc YouTube Phone sẽ như thế nào?';
s = utf8.encode(s);


function log(str) {
    str = '=================================' + str + '====================================';
    console.log(str.inverse);
}

var promise = Q.fcall(function () {
    return log('THIS IS TOOL MAKE VIDEO');
});

promise
    .then(function (data) {
        resize_img();
        return 'resize_img success';
    })
    .then(function (data) {
        merge_bg();
        return 'merge_bg success';
    })

    .then(function (data) {
        make_small_video();
    })
    .then(function (data) {
        merge_videos();
    })
;


function resize_img() {
    log('resize_img');
    dir.promiseFiles(images_folder)
        .then(function (files) {
            files.forEach(function (file) {
                resize(file);
            })
        })
        .catch(function (e) {
            console.log(e);
        });

}

function make_small_video() {
    log('make_small_video');
    dir.promiseFiles(images_render)
        .then(function (files) {
            files.forEach(function (file) {
                make_video(file);
            })
        })
        .catch(function (e) {
            console.log(e);
        });
}

function resize(file) {
    var base_name = path.basename(file);
    var file_name = 'resize/' + base_name;
    gm(file).resize(440, 320).write(file_name, function (err) {
        if (err) console.log(err);
        console.log('Done resize!');
    });
}


function merge_bg() {
    log('merge_bg');

    dir.promiseFiles(images_resize)
        .then(function (files) {
            files.forEach(function (file) {
                var base_name = path.basename(file);
                var file_name = 'merge/' + base_name;

                gm(bg_image)
                    .composite(file)
                    .geometry('+136+180')
                    .write(file_name, function (err) {
                        if (err) console.log(err);
                        console.log('Done merge_bg!');
                        add_text(file_name);
                    });
            })
        })
        .catch(function (e) {
            console.log(e);
        });


}

function add_text(file) {
    log('add_text');
    var file_name = 'merge/' + path.basename(file);
    gm(file)
        .font(font_text, 36)
        .drawText(780, 220, s)
        .drawText(800, 450, s)
        .encoding('Unicode')
        .write(file_name, function (err) {
            if (err) console.log(err);
            console.log('Done add_text!');
        });
}


function make_video(file) {
    log('make_video : ' + file);

    var paths = path.parse(file);
    var video_tmp = video_temp + '\\' + paths.name + '.mp4';

    var audio = AUDIO_ROOT + '/song.mp3';
    var audioParams = {
        fade: true,
        delay: 2 // seconds
    };
    var videoOptions = {
        fps: 30,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1080,
        videoCodec: 'libx264',
        size: '960x?',
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

    videoshow([file], videoOptions)
        .audio(audio, audioParams)
        //.logo(logo,logoParams)
        .save(video_tmp)
        .on('start', function (command) {
            //console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Video created in:', output)
        })
}


function merge_videos() {
    log('merge_videos');
    dir.promiseFiles(video_temp)
        .then(function (files) {

            var p = Q.fcall(function () {
                var ff = ffmpeg();
                files.forEach(function (f) {
                    ff.input(f);
                });
                return ff;
            });

            p.then(function (ff) {
                ff.on('end', function () {
                    console.log('files have been merged succesfully');
                })
                    .on('error', function (err) {
                        console.log('an error happened: ' + err.message);
                    })
                    .mergeToFile('video_result/video.mp4');

            });
        })

        .catch(function (e) {
            console.log(e);
        });

}






