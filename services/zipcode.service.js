const { ZipcodeClient } = require('../client/zipcode.client')
const { isObjecEmpty } = require('../utils/objects')

class ZipcodeService {

    constructor() {
        this.#zipcodeClient = new ZipcodeClient()
    }

    #zipcodeClient


    #_prepareRequests(originsZipcodes, destinyZipcodes, product) {
        const asyncRequests = []
        for (const originZipcode of originsZipcodes) {
            for (const destinyZipcode of destinyZipcodes) {
                const requestSedexCall = this.#zipcodeClient.getCalcPrecoRequestCall(originZipcode, destinyZipcode, product, true)
                const requestPacCall = this.#zipcodeClient.getCalcPrecoRequestCall(originZipcode, destinyZipcode, product, false)
                asyncRequests.push(requestSedexCall, requestPacCall)
            }
        }
        return asyncRequests
    }

    #_getTheShippestShipping(results) {
        const shippestShippingInfo = {
            value: Number.MAX_SAFE_INTEGER,
        }
        for (const result of results) {
            if (isObjecEmpty(result))
                continue
            const value = result['value']
            if (shippestShippingInfo.value > value) {
                shippestShippingInfo['serviceType'] = result['Codigo']
                shippestShippingInfo['originCep'] = result['originCep']
                shippestShippingInfo['destinyCep'] = result['destinyCep']
                shippestShippingInfo['deliveryTime'] = result['deliveryTime']
                shippestShippingInfo['value'] = value
            }
        }
        return shippestShippingInfo
    }

    async calculateTheShippestShippingService(originZipcodes, destinyZipcodes, product) {
        const preparedRequests = this.#_prepareRequests(originZipcodes, destinyZipcodes, product)
        const responses = await Promise.all(preparedRequests)
        const shippestShipping = this.#_getTheShippestShipping(responses)
        console.log('A entrega mais barata é: ', shippestShipping)
    }
}

module.exports = { ZipcodeService }