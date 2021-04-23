const { isObjecEmpty: isObjectEmpty } = require('../utils/objects')

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

    #_getTheCheaperShipping(results) {
        const maxNumber = Number.MAX_SAFE_INTEGER
        let cheaperShippingInfo = {
            value: maxNumber,
        }
        for (const result of results) {
            if (isObjectEmpty(result))
                continue
            const value = result['value']
            if (cheaperShippingInfo.value > value) {
                cheaperShippingInfo = result
            }
        }
        return cheaperShippingInfo.value == maxNumber ? {} : cheaperShippingInfo
    }

    async calculateTheCheaperShippingService(originZipcodes, destinyZipcodes, product) {
        const preparedRequests = this.#_prepareRequests(originZipcodes, destinyZipcodes, product)
        const responses = await Promise.all(preparedRequests)
        const cheaperShipping = this.#_getTheCheaperShipping(responses)
        return cheaperShipping
    }
}

module.exports = { ZipcodeService }