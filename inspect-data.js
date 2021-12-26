//This script just prints out the first few lines of a file, used for very large files
// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Z:\\sfiltered.json')
});

ln = 0

lineReader.on('line', (line) => {
    ln++
    if(ln >= 100) {
        lineReader = null
        return
    }
    console.log(ln, line)
});
