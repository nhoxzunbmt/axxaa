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

var audioParams = {
    fade: true,
    delay: 2 // seconds
};
var videoOptions = {
    fps: 30,
    loop: 10, // seconds
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
var img = IMAGE_ROOT+ '/bg/bg.png';

var audio = AUDIO_ROOT + '/dic/Iceland.mp3';
var audio2 = AUDIO_ROOT + '/dic/icily.mp3';

videoshow([img],videoOptions)
    .audio(audio, audioParams)
    .audio(audio2, audioParams)
    .save('audio.mp4')
    .on('start', function (command) {
        console.log('ffmpeg process started:', command)
    })
    .on('error', function (err) {
        console.error('Error:', err)
    })
    .on('end', function (output) {
        console.log('Video created in:', output)
    });
