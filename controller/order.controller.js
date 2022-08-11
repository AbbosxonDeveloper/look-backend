let { read, write } = require('../utils/model.js')

let orderController = {
    GET: (req, res) => {
        let users = read('users')
        let orders = read('orders')
        let foods = read('foods')
        let { userId } = req.query

        orders.map(order => {
            order.user = users.find(user => user.userId == order.userId)
            order.food = foods.find(food => food.foodId == order.foodId)
        })

        if (userId) {
            let order = orders.find(order => order.userId == userId)
            if (order) {
                res.end(JSON.stringify(order))
            } else {
                res.end('nothing found')
            }
        } else {
            res.end(JSON.stringify(orders))
        }


    },
    POST: (async(req, res) => {
        let { foodId, userId, count } = await req.body
        let orders = read('order')

        let order = orders.filter(order => order.foodId == foodId && order.userId == userId)
        if (order) {
            order.count = order.count + count
        } else {
            order = {
                orderId: orders.length ? orders.at(-1).orderId + 1 : 1,
                foodId,
                userId,
                count
            }
            orders.push(order)
        }
        write('orders', orders)
        res.end(JSON.stringify({ status: 200, message: 'accepted' }))
    })
}

module.exports = orderController