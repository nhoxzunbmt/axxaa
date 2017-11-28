var sharp = require("sharp");

// sharp('ov.png')
//     .resize(300)
//   .toFile('ovz.png', function () {
//
//   });


sharp('a.jpg')
    //.rotate(180)
    .resize(600,600)
    .flatten()
     .background('#f50417')
    .overlayWith('ovz.png', { gravity: sharp.gravity.southeast } )
    .sharpen()
    .withMetadata()
    //.quality(90)
    //.background('')
    .extend({top: 100, bottom: 100, left: 100, right: 100})
    .toFile('outtt.png');