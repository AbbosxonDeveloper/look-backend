let fs = require('fs')
let path = require('path')

function read(filename) {
    let data = fs.readFileSync(path.join(process.cwd(), 'database', filename + '.json'), "utf-8")
    return JSON.parse(data)
}

function write(filename, data) {
    let date = fs.writeFileSync(path.join(process.cwd(), 'database', filename + '.json'), JSON.stringify(data, null, 4))
    return true
}

module.exports = {
    read,
    write
}