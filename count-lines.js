const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('latest-all.json')
});

var lc = -2 //because first and last line is a bracket

setInterval(() => {
    console.log(Date.now(), lc)
}, 5000);

lineReader.on('line', (line) => {
    lc++
    return
});
