let { read, write } = require('../utils/model.js')


let foodController = {
    GET: (req, res) => {
        let foods = read('foods')
        res.end(JSON.stringify(foods))
    },
}

module.exports = foodController