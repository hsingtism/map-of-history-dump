const fs = require('fs')

const dat = JSON.parse(fs.readFileSync('ready.json', 'utf-8'))

console.log('length of dataset: ', dat.length)
console.log('oldest entry:', old())
console.log('newest entry:', newf())

console.log('entry count by year written:')
let distribution = byYear()
distribution[0] = 'distribution by year. year is index number plus 8000'
fs.appendFile('dataDistribution.json', JSON.stringify(distribution), (err) => {
    console.log(err)
})

function old() {
    var min = 0
    var u
    for (let j = 0; j < dat.length; j++) {
        if (dat[j]['t'] < min) { min = dat[j]['t']; u = j }
    }
    return [min, dat[u]['i']]
}

function newf() { //f is because new is a keyword
    var max = 0
    var u
    for (let j = 0; j < dat.length; j++) {
        if (dat[j]['t'] > max) { max = dat[j]['t']; u = j }
    }
    return [max, dat[u]['i']]
}

function byYear() {
    var distr = Array(10100).fill(0)
    for (let j = 0; j < dat.length; j++) {
        distr[dat[j]['t'] + 8000]++
    }
    return distr
}
