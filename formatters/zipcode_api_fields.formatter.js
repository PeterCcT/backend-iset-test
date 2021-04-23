class ZipcodeApiFieldsFormatter {

    constructor(zipcodeApiFields, zipcodeObjectFields) {
        this.#apiFields = zipcodeApiFields
        this.#objectFields = zipcodeObjectFields
    }

    #apiFields
    #objectFields

    formatBaseParams(originZipcode, destinyZipcode, product, serviceType) {
        const params = {}
        params[this.#apiFields.serviceTypeParam] = serviceType
        params[this.#apiFields.cepOriginParam] = originZipcode
        params[this.#apiFields.cepDestinyParam] = destinyZipcode
        params[this.#apiFields.productWeightParam] = product.weight.toString()
        params[this.#apiFields.productHeightParam] = product.height.toFixed(1)
        params[this.#apiFields.productWidthParam] = product.width.toFixed(1)
        params[this.#apiFields.productLengthParam] = product.length.toFixed(1)
        params[this.#apiFields.productDiameterParam] = product.diameter.toFixed(1)
        params[this.#apiFields.enterpriseCodeParam] = ''
        params[this.#apiFields.passwordAccessToServiceParam] = ''
        params[this.#apiFields.deliveryOnHandsParam] = 'n'
        params[this.#apiFields.declaredValueParam] = 0
        params[this.#apiFields.deliveryReceiveNotificationParam] = 'n'
        params[this.#apiFields.apiResponseTypeParam] = 'xml'
        return params
    }

    formattedCalcPrecoResponse(zipcodeObject, originZipcode, destinyZipcode) {
        const result = zipcodeObject[this.#apiFields.calcPrecoResult][this.#apiFields.calcPrecoResultService][this.#apiFields.calcPrecoServiceArray][0]
        const error = result[this.#apiFields.error]
        const objectContainsError = error !== '0' || error === ''
        if (objectContainsError)
            return {}
        const formattedZipcode = {}
        const serviceCode = result[this.#apiFields.serviceTypeCode]
        formattedZipcode[this.#objectFields.value] = Number(result[this.#apiFields.value].replace(',', '.'))
        formattedZipcode[this.#objectFields.deliveryTime] = Number(result[this.#apiFields.deliveryTime])
        formattedZipcode[this.#objectFields.originCep] = originZipcode
        formattedZipcode[this.#objectFields.destinyCep] = destinyZipcode
        formattedZipcode[this.#objectFields.serviceType] = this.#apiFields.serviceType(`${serviceCode}`)
        return formattedZipcode
    }
}

module.exports = { ZipcodeApiFieldsFormatter }