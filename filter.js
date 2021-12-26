const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('latest-all.json')
});

var ln = 0
var ve = 0
var t = {
    title: null,
    isHuman: null,
    TOD: null,
    CTOD: null,
    POD: null,
    ts: 0,
    ln: -1,
}
var bst = ''

setInterval(() => {
    console.log('SAMPLE', Date.now(), ln, ve, JSON.stringify(t))
}, 5000);

lineReader.on('line', (line) => {
    ln++
    // if(ln % 100) return
    if (line.length <= 2) return
    var obj = JSON.parse(line.substring(0, line.length - 1)) //excludes delimiting comma
    try {
        t.title = obj.id
        t.isHuman = obj.claims['P31'][0]['mainsnak']['datavalue']['value']['id'] == 'Q5'        // is human
        t.TOD = obj.claims['P570'][0]['mainsnak']['datavalue']['value']['time']             // time of death
        t.CTOD = obj.claims['P570'][0]['mainsnak']['datavalue']['value']['calendarmodel']    // calender of ^
        t.POD = obj.claims['P20'][0]['mainsnak']['datavalue']['value']['id']                // place of death
        t.ts = Date.now()
        t.ln = ln

        if (t.CTOD.substring(t.CTOD.length - 8, t.CTOD.length) == 'Q1985727') t.CTOD = 'G'
        if (t.CTOD.substring(t.CTOD.length - 8, t.CTOD.length) == 'Q1985786') t.CTOD = 'J'
    } catch (err) {
        return null
    }
    ve++
    if (ve % 1000) {
        bst += JSON.stringify(t)
        bst += ',\n'
        return null
    }
    console.log('WRITTEN')
    fs.appendFile('filtered.json', bst, (err) => {
        console.log(err)
    })
    bst = ''
    return null
});