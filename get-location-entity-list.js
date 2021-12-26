const fs = require('fs')

// read line by line: https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Z:\\sfiltered.json')
});

var ln = 0

const st = Date.now()

setInterval(() => {
    console.log(Date.now() - st, ln, list.length)
}, 250);

var list = []

lineReader.on('line', (line) => {
    ln++
    if (line == 'HALT') {
        console.log('WRITTEN')
        fs.appendFile('Z:\\neededCoord.json', JSON.stringify(list), (err) => {
            console.log(err)
        })
        lineReader = null
        return
    }
    const src = JSON.parse(line)
    if (list.indexOf(src.pi) == -1) {
        list.push(src.pi)
    }
});
