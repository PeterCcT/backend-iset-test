class FakeZipCodeClient {
    constructor() {
        this.#http = require('http')
    }

    #http

    #baseUrl = 'http://localhost:3000'

    getCalcPrecoRequestCall(originZipcode, destinyZipcode, isSedex) {
        let response
        const url = `${this.#baseUrl}?origin=${originZipcode}&destiny=${destinyZipcode}`
        return new Promise((resolve, _) => {
            this.#http.get(url, (res) => {
                res.setEncoding('utf-8')
                res.on('data', (data) => {
                    response = JSON.parse(data)
                })
            }).on('close', () => {
                resolve(response)
            }).end()
        })
    }
}

module.exports = { FakeZipCodeClient }