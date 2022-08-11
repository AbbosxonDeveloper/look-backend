let http = require('http')
let Express = require('./lib/express.js')
let querystring = require('querystring')
let fs = require('fs')
let { read, write } = require('./utils/model.js')
let userController = require('./controller/user.controller.js')
const foodController = require('./controller/food.controller.js')
const orderController = require('./controller/order.controller.js')

function httpServer(req, res) {

    const app = new Express(req, res)
    app.get('/users', userController.GET)
    app.post("/users", userController.POST)

    app.get('/foods', foodController.GET)

    app.get('/order', orderController.GET)
    app.post("/order", orderController.POST)

    app.delete('/delete', userController.DELETE)
}

let server = http.createServer(httpServer)

server.listen(4000, () => console.log('server ready http://localhost:4000'))