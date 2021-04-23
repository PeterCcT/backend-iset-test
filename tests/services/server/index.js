const http = require('http')
const { formattedResponse } = require('../../configs/mock/api.mock')
const {
    standardResponseOriginZipcode,
    standardResponseDestinyZipcode
} = require('../../configs/mock/standard.mock')

function getRandomValue() {
    return Math.floor(Math.random() * (15 - 12) + 12)
}

function getRandomDeliveryTime() {
    return Math.floor(Math.random() * (10 - 1) + 1)
}

function getOriginAndDestinyZipcodes(url) {
    const { URL } = require('url')
    const uri = new URL(`http://localhost:3000${url}`)
    return [uri.searchParams.get('origin'), uri.searchParams.get('destiny')]
}


http.createServer((req, res) => {
    const method = req.method.toUpperCase()
    switch (method) {
        case 'GET':
            let responseToClient
            const [originZipcode, destinyZipcode] = getOriginAndDestinyZipcodes(req.url)
            if (originZipcode === standardResponseOriginZipcode && destinyZipcode === standardResponseDestinyZipcode) {
                responseToClient = formattedResponse
            } else {
                responseToClient = {
                    value: getRandomValue(),
                    serviceType: 'PAC',
                    originCep: originZipcode,
                    destinyCep: destinyZipcode,
                    deliveryTime: getRandomDeliveryTime(),
                }
            }
            setTimeout(() => res.end(JSON.stringify(responseToClient)), 3000)
            break;

        default:
            res.statusCode(405)
            break;
    }
}).listen(3000)