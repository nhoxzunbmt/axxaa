var Jimp = require("jimp");

var bg = 'bg.png';
var do_vat = 'z.jpg';

Jimp.read(bg).then(function (lenna) {


    // lenna.resize(500, 500)            // resize
    //     .write("lena-small-bw.jpg"); // save


    Jimp.read(do_vat).then(function (ax) {
        ax.resize(440, 320);
        lenna.composite(ax,136,180);


        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
            lenna.print(font, 780, 220, "Hình ẢNH Á ờ ạ");
            lenna.print(font, 800, 450, "Mieu ta hinb");
            lenna.write("lena-small-bw.jpg");
        });



        console.log('ok');

    }).catch(function (err) {
        console.error(err);
    });


}).catch(function (err) {
    console.error(err);
});






