var sharp = require("sharp");

sharp('k.png')
    .resize(500)
  .toFile('kz.png', function () {
      sharp('boy.png')
      //.rotate(180)

          .resize(500,500)
          //.flatten()
          //.background('#f50417')
          .overlayWith({
              text: '213123123'
          })
          //.sharpen()
          //.withMetadata()
          //.quality(90)
          //.background('')
          .extend({top: 100, bottom: 100, left: 100, right: 100})
          .toFile('outtt.png');
  });


