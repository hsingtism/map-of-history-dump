const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Z:\\filtered.json')
});

//var url = 'https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=ENTITY&format=json&property=P625'
var ln = 0
var buffer = ''

setInterval(() => {
    console.log(Date.now(),ln)
}, 5000);

lineReader.on('line', (line) => {
    ln++
    const obj = JSON.parse(line.substring(0,line.length-1))
    let impb = {t:'',ti:'',pi:''}
    if(!obj.isHuman) {
        console.log('REJECTED. not human',line)
        return
    }
    if(obj.CTOD != 'J' && obj.CTOD != 'G') {
        console.log('REJECTED. weird calender',line)
        return
    }
    try {
        impb.ti = Number(obj.TOD.substring(0,5))
        impb.t = obj.title 
        impb.pi = obj.POD
    } catch (err) {
        console.log('cannot parse',line)
    }
    if(ln%1000){
        buffer += JSON.stringify(impb)
        buffer += '\n'
        return
    }
    console.log('WRITTEN')
    fs.appendFile('Z:\\sfiltered.json', buffer, (err) => {
        console.log(err)
    })
    buffer = ''
    return null
});
