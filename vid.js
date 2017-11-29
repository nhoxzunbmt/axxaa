const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const Ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
Ffmpeg.setFfmpegPath(ffmpegPath)

Ffmpeg()
    .addInput('images.txt')
    .inputOptions(['-safe 0', '-f concat'])
    .on('error', function (e) {
        console.log(e)
    })
    .on('end', function () {
        console.log('create video')
        //resolve(`/tmp/${fileName}.mp4`)
    })
    .videoCodec('libx264')
    .size('500x500')
    .output('vid.mp4')
    .outputOptions(['-vf fps=30', '-pix_fmt yuv420p'])
    .run();
