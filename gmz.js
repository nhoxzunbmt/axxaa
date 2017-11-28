var fs = require('fs')
    , gm = require('gm');

// resize and remove EXIF profile data
gm('z.jpg')
    //.resize(240, 240)
    .font("timesbd.ttf", 32)
    .drawText('text_data.txt')
    .noProfile()
    .write('resize.png', function (err) {
        if (!err) console.log('done');
        console.log(err);
    });
