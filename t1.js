var gm = require('gm').subClass({ imageMagick: true });

gm('boy.png')
    // .out('bg.png')
    // .geometry('+10+20')
    .out('-composite')
    .font('arialbd.ttf', 12)
    .drawText(20, 50, "Test")
    .write('boy_output.jpg', function(err) {
        if (err)
            console.log('Error creating image', err);
    });