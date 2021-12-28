const fs = require('fs');

// https://stackoverflow.com/a/32599033/
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Z:\\sfiltered.json')
});

var ln = 0
var buffer = ''
var noCoord = 0

const LUT = JSON.parse(fs.readFileSync('Z:\\coordinateLookup - Copy.json', 'utf-8'))

setInterval(() => {
    console.log(Date.now(), ln, noCoord, buffer.length)
    console.log('WRITTEN')
    fs.appendFile('ready.json', buffer, (err) => {
        console.log(err)
    })
    buffer = ''
}, 5000);

lineReader.on('line', (line) => {
    ln++
    if(line.length < 3) { //for the end
        console.log('WRITTEN')
        fs.appendFile('ready.json', buffer, (err) => {
            console.log(err)
        })
        buffer = ''
    }
    const obj = JSON.parse(line.substring(0, line.length))
    var res = {
        i: '',
        t: null,
        c: {
            a: null,
            o: null,
            p: null
        }
    }
    res.i = obj.t //id shouldn't be needed but still including it in case
    res.t = obj.ti
    for (let j = 0; j < LUT.length; j++) {  //linear search should be fine, right?
        if (LUT[j]['i'] == obj.pi) {         //it's like 100000 entries, shouldn't take that long?
            res.c.a = LUT[j]['lat']         //this is my attempt at justifying not implementing more efficent methods
            res.c.o = LUT[j]['lon']         //plus, the data is not perfectly sorted anyways
            res.c.p = LUT[j]['per']         //i am on 5 hours of sleep 
            buffer += JSON.stringify(res)
            buffer += ',\n'
            return
        }
    }
    // console.log('cannot find coordinate')
    noCoord++
    return null
});
