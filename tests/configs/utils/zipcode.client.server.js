class FakeZipCodeClient {
    constructor() {
        this.#http = require('http')
    }

    #http

    #baseUrl = 'http://localhost:3000'

    async getCalcPrecoRequestCall(originZipcode, destinyZipcode, isSedex) {
        let response = []
        const url = `${this.#baseUrl}?origin=${originZipcode}&destiny=${destinyZipcode}`
        this.#http.get(this.#baseUrl, (req, res) => {
            res.on('data', (data) => {
                response.push(data)
            })
        }).end()
        return response.join('')
    }
}

module.exports = { FakeZipCodeClient }