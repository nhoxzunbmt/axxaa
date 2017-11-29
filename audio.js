const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const Ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
Ffmpeg.setFfmpegPath(ffmpegPath)
//ffmpeg -i song.mp3 -i song_1.mp3 -i song_2.mp3 -filter_complex concat=n=3:v=0:a=1 -f MOV -vn -y input.mp3
Ffmpeg()
    .addInput('audios.txt')
    .inputOptions(['-safe 0', '-f concat'])
    .on('error', function (e) {
        console.log(e)
    })
    .on('end', function () {
        console.log('create audio')
        //resolve(`/tmp/${fileName}.mp4`)
    })

    .audioCodec('libmp3lame')
    //.size('500x500')
    .output('vid.mp3')
    .outputOptions(['-filter:a volume=1'])

    .run();
