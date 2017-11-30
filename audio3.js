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
var probe = require('node-ffprobe');


videoshow.ffmpeg.setFfmpegPath(ffmpeg_install.path);
videoshow.ffmpeg.setFfprobePath(ffprobe_install.path);


const IMAGE_ROOT = __dirname + '\\input\\images';
const AUDIO_ROOT = __dirname + '\\input\\audio';
const FONT_ROOT = __dirname + '\\input\\fonts';
const font_text = FONT_ROOT + "/arialbd.ttf";
var input = 'video_temp/panda.mp4';
//input = 'output2.mp4';

var audio1 = 'input/audio/dic/icing sugar.mp3';
var audio2 = 'input/audio/dic/icicle.mp3';
var audio3 = 'input/audio/dic/icily.mp3';
var audio4 = 'input/audio/dic/Ichabod Crane.mp3';
// ffmpeg.ffprobe(input, function(err, metadata) {
//     console.dir(metadata);
// });
run();


var s = 'Cánh đồng quạt gió này được biết đến rộng rãi sau khi xuất hiện trong \n' +
    'MV Quá khứ còn lại gì của Rocker Nguyễn.\n Được ví như “Hà Lan của Việt Nam”, ' +
    '\nnơi đây đã thu hút hàng trăm lượt “check-in” của các bạn trẻ chỉ trong thời gian ngắn.';
//s = utf8.encode(s);
s = 'hello';

//sub();
// (w-text_w)/2
//
// h-60*t


// y=h-line_h:x=-50*t : ngang
// x: '(w-text_w)/2',// y: 'h-60*t',: duoi len
//'(main_w/2-text_w/2)' : giữa
//y=h-20*t: duoi len
//:x=100:y=x/dar:enable=lt(mod(t\,3)\,1):text='blink' : 3s show

function sub() {
    ffmpeg('video_temp/fennec.mp4')
    //.audioCodec('aac') // Audio Codec
    //.videoCodec('libx264')  // Video Codec
    //     .videoFilters(
    //         {
    //             filter: 'drawtext',
    //             options: {
    //                 fontfile: 'input/timesbd.ttf',
    //                 text: s,
    //                 //textfile:'',
    //                 fontsize: 20,
    //                 // fontcolor: '#ccc',
    //                 x: '100',
    //                 y: 'x/dar',
    //                 enable: 'lt(mod(t\\,3)\\,1)',
    //                 //encoding:'unicode'
    //
    //                 // shadowcolor: 'black',
    //                 // shadowx: 2,
    //                 // shadowy: 2,
    //                 //start_number: 5,
    //                 box: 1,
    //                 boxcolor: 'red@0.2'
    //             }
    //         }, {
    //             filter: 'drawtext',
    //             options: {
    //                 fontfile: 'input/timesbd.ttf',
    //                 text: s,
    //                 //textfile:'',
    //                 fontsize: 20,
    //                 // fontcolor: '#ccc',
    //                 y: 'h-20*t',
    //                 //encoding:'unicode'
    //
    //                 // shadowcolor: 'black',
    //                 // shadowx: 2,
    //                 // shadowy: 2,
    //                 //start_number: 5,
    //                 box: 1,
    //                 boxcolor: 'red@0.2'
    //             }
    //         })
    //     .videoFilters('fade=in:0:100')
        .audioFilters('-i input/audio/dic/Ichabod Crane.mp3 -y -filter_complex [1:a] adelay=4500|4500 [delayed];[0:a] [delayed] amix [out] -acodec aac -vcodec copy -map 0:v -map [out]')
        .output('output.mp4')
        .on('start', function (e) {
            console.log('Ffmpeg start :   ' + e);
        })
        .on('end', function () {
            console.log("Done")

        })
        .on('error', function (err) {
            console.log('error: ' + err);

        }).run();
}

function run() {
    //ffmpeg -i video_temp/panda.mp4 -i input/audio/dic/Ichabod Crane.mp3 -y -filter_complex [1:a] adelay=4500|4500 [delayed];[0:a] [delayed] amix [out] -acodec aac -vcodec copy -map 0:v -map [out] output3.mp4

    ffmpeg()
        .input(input)
        .input(audio4)
        .complexFilter([
            '[1:a] adelay=4500|4500 [delayed]',
            '[0:a] [delayed] amix [out]'
        ])
        .outputOptions([
            '-map 0:v',
            '-map [out]'
        ])
        .audioCodec('aac')
        .videoCodec('copy')
        .on('start', function (e) {
            console.log('Ffmpeg start :' + e);
        })
        .on('error', function (e) {
            console.log('Ffmpeg error :' + e);
        })
        .save('output3.mp4')
}
