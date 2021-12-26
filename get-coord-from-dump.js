const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('latest-all.json')
});

var ln = 0
var ve = 0
var bst = ''
var out

const cNeeded = JSON.parse(fs.readFileSync('neededCoord.json','utf-8'))

setInterval(() => {
    console.log(Date.now(), ln, ve, JSON.stringify(out))
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
    const obj = JSON.parse(line.substring(0, line.length - 1)) //excludes delimiting comma
    out = {
        i: '',
        lat: false,
        lon: false,
        per: false,
    }
    if(cNeeded.indexOf(obj.id) == -1) return null
    try {
        out.i = obj.id
        out.lat = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['latitude']
        out.lon = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['longitude']
        out.per = obj.claims['P625'][0]['mainsnak']['datavalue']['value']['precision']
    } catch (err) {
        return null
    }
    ve++
    if (ve % 100) {
        bst += JSON.stringify(out)
        bst += ',\n'
        return null
    }
    console.log('WRITTEN')
    fs.appendFile('coordinateLookup.json', bst, (err) => {
        console.log(err)
    })
    bst = ''
    return null
});
