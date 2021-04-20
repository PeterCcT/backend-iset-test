class Promissifier {
    static promissifyGetHttpRequest(url) {
        const http = require('http')
        let response = ''
        return new Promise((resolve, _) => {
            http.get(url, (res) => {
                const result = res.setEncoding('utf-8')
                result.on('data', (chunk) => {
                    response.concat(chunk)
                })
                result.on('end', () => resolve(response))
            })
        })
    }
}

module.exports = { Promissifier }