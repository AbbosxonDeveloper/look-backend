let { read, write } = require('../utils/model.js')

let userController = {
    GET: ((req, res) => {
        let users = read('users')
            // let { userId } = req.query
            // let user = users.filter(user => user.userId == userId)
            // console.log(req.query)
        res.end(JSON.stringify(users))
    }),

    POST: (async(req, res) => {
        let { username, contact } = await req.body
        let users = read('users')
        let newUser = { userId: users.at(-1).userId + 1 || 1, username, contact }
        users.push(newUser)
        write('users', users)
        let message = { data: newUser }
        res.end(JSON.stringify(message))
    }),

    DELETE: async(res, req) => {
        let { userId } = await req.body
        let users = read('users')
        let user = users.filter(user => user.userId != userId)
        if (user) {
            write("users", user)
            res.end(JSON.stringify('deleted'))
        } else {
            res.end(JSON.stringify('invalid user id'))
        }
    }
}

module.exports = userController