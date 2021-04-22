const http = require('http')
const {
    standardResponseOriginZipcode,
    standardResponseDestinyZipcode,
    response
} = require('../server/mock/server.mock')

function getRandomValue() {
    return Math.floor(Math.random() * (min - max))
}

function getOriginAndDestinyZipcodes(url) {
    const { URL } = require('url')
    const uri = new URL(url)
    return [uri.searchParams.get('origin'), uri.searchParams.get('destiny')]
}


http.createServer((req, res) => {
    const method = req.method.toUpperCase()
    switch (method) {
        case 'GET':
            let responseToClient
            const [originZipcode, destinyZipcode] = getOriginAndDestinyZipcodes(req.url)
            if (originZipcode === standardResponseOriginZipcode && destinyZipcode === standardResponseDestinyZipcode) {
                responseToClient = Object.assign({ 'Codigo': 04510 }, response)
            }
            responseToClient = {
                Codigo: 04510,
                value: getRandomValue(),
                serviceType: 'PAC',
                originZipcode: originZipcode,
                destinyZipcode: destinyZipcode,
                deliveryTime: 1,
            }
            setTimeout(res.end(responseToClient), 1000)
            break;

        default:
            res.statusCode(405)
            break;
    }
}).listen(3000, () => {
    console.log('Server running on port 3000')
})