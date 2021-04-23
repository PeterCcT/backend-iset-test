const { ZipcodeClient } = require('../../client/zipcode.client')
const { isObjecEmpty } = require('../../utils/objects')

class ZipcodeService {

    constructor(zipcodeClient) {
        this.#zipcodeClient = zipcodeClient
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
        const maxNumber = Number.MAX_SAFE_INTEGER
        const shippestShippingInfo = {
            value: maxNumber,
        }
        for (const result of results) {
            if (isObjecEmpty(result))
                continue
            const value = result['value']
            if (shippestShippingInfo.value > value) {
                shippestShippingInfo['serviceType'] = result['serviceType']
                shippestShippingInfo['originCep'] = result['originCep']
                shippestShippingInfo['destinyCep'] = result['destinyCep']
                shippestShippingInfo['deliveryTime'] = result['deliveryTime']
                shippestShippingInfo['value'] = value
            }
        }
        return shippestShippingInfo.value == maxNumber ? {} : shippestShippingInfo
    }

    async calculateTheShippestShippingService(originZipcodes, destinyZipcodes, product) {
        const preparedRequests = this.#_prepareRequests(originZipcodes, destinyZipcodes, product)
        const responses = await Promise.all(preparedRequests)
        const shippestShipping = this.#_getTheShippestShipping(responses)
        return shippestShipping
    }
}

module.exports = { ZipcodeService }