let fs = require("fs")
let path = require("path")
let url = require('url')
let querystring = require('querystring')

class Express {
    constructor(req, res) {
        this.req = req;
        this.res = res;

        if (this.req.method != "GET") {
            this.req.body = new Promise((resolve, reject) => {
                let str = ""
                req.on("data", chunk => str += chunk)
                req.on("end", () => {
                    try {
                        let data = JSON.parse(str)
                        return resolve(data)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        }
        this.res.setHeader('Access-Control-Allow-Origin', "*")
    }

    get(route, callback) {
        let { query, pathname } = url.parse(this.req.url)
        query = querystring.parse(query)
        this.req.query = query
        this.req.pathname = pathname
        if (pathname == route && this.req.method == "GET") {
            callback(this.req, this.res);
        }
    }

    post(route, callback) {
        if (this.req.url == route && this.req.method == "POST") {
            callback(this.req, this.res);
        }
    }

    put(route, callback) {
        if (this.req.url == route && this.req.method == "PUT") {
            callback(this.req, this.res)
        }
    }

    delete(route, callback) {
        if (this.req.url == route && this.req.method == "DELETE") {
            callback(this.req, this.req)
        }
    }

    htmlEngine(pathName) {
        this.res.htmlRender = (fileName) => {
            let buffer = fs.readFileSync(path.join(pathName, fileName + ".html"));
            this.res.end(buffer);
        };
    }

    cssEngine(pathName) {
        this.res.cssRender = (fileName) => {
            let buffer = fs.readFileSync(path.join(pathName, fileName + ".css"));
            this.res.end(buffer);
        };
    }
}

module.exports = Express