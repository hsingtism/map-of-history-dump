const fs = require('fs')

var src = JSON.parse(fs.readFileSync('ready.json', 'utf-8'))
var dst = ''

src.sort((a, b) => {
    return a.t - b.t;
})

for (let j = 0; j < src.length; j++) {
    dst += `${src[j]['t']},${src[j]['c']['a'].toFixed(6)},${src[j]['c']['o'].toFixed(6)}\n`
}

fs.appendFile('ready.csv', dst, (err) => console.log(err))
