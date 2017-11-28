var fs = require('fs')
    , gm = require('gm');

// resize and remove EXIF profile data
gm('z.jpg')
    //.resize(240, 240)
    .font("arialbd.ttf", 32)
    .drawText(100,100,'Tràn ợ thanh Á')
    .encoding('Unicode')
    .write('resize.png', function (err) {
        //if (!err) console.log('done');
        console.log(err);
    });
