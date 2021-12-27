const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('latest-all.json')
});

var ln = 0
var ve = 0
var bst = ''

const cNeeded = JSON.parse(fs.readFileSync('neededCoord.json', 'utf-8'))

setInterval(() => {
    console.log(Date.now(), ln, ve)
    console.log('WRITTEN')
    fs.appendFile('coordinateLookup.json', bst, (err) => {
        console.log(err)
    })
    bst = ''
}, 5000);

lineReader.on('line', (line) => {
    ln++
    if (line.length <= 2) {
        console.log('WRITTEN')
        fs.appendFile('coordinateLookup.json', bst, (err) => {
            console.log(err)
        })
        bst = ''
        return
    }
    processLine(line)
});

function processLine(line) {
    const obj = JSON.parse(line.substring(0, line.length - 1)) //excludes delimiting comma
    var out = {
        i: '',
        lat: false,
        lon: false,
        per: false,
    }
    if (!obj.claims.P625) return
    if (cNeeded.indexOf(obj.id) == -1) return null
    try {
        out.i = obj.id
        out.lat = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['latitude']
        out.lon = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['longitude']
    } catch (err) {
        return null
    }
    try {
        out.per = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['precision']
    } catch (err) {
        console.log('no percision')
        out.per = -32768 //arbitrary
    }
    ve++
    bst += JSON.stringify(out) + '\n'
    return null
}
