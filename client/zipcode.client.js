class ZipcodeClient {
    constructor(soapClient, zipcodeApiFormatter, zipcodeApiFields) {
        this.#apiFieldsFormatter = zipcodeApiFormatter
        this.#apiFields = zipcodeApiFields
        this.soapClient = soapClient
    }
    #baseApiUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'

    #apiFieldsFormatter
    #apiFields

    soapClient

    #_formatBaseParams(originZipcode, destinyZipcode, product, serviceType) {
        const requestParams = this.#apiFieldsFormatter.formatBaseParams(originZipcode, destinyZipcode, product, serviceType)
        return requestParams
    }


    get #_apiClient() {
        return this.soapClient.createClientAsync(this.#baseApiUrl, {
            wsdl_options: { timeout: 40000 }
        })
    }

    #_formatCalcPrecoResponse(result, originZipcode, destinyZipcode) {
        const [calcPrecoResult] = result
        return this.#apiFieldsFormatter.formattedCalcPrecoResponse(calcPrecoResult, originZipcode, destinyZipcode)
    }

    async #_formatCalcPrecoRequestResponseCall(client, params, originZipcode, destinyZipcode) {
        const result = await client.CalcPrecoPrazoAsync(params)
        const formattedResponse = this.#_formatCalcPrecoResponse(result, originZipcode, destinyZipcode)
        return formattedResponse
    }

    async #_formatCalcPrecoRequestCall(params, originZipcode, destinyZipcode) {
        const client = await this.#_apiClient
        return this.#_formatCalcPrecoRequestResponseCall(client, params, originZipcode, destinyZipcode)
    }

    getCalcPrecoRequestCall(originZipcode, destinyZipcode, product, isSedex) {
        const serviceType = isSedex ? this.#apiFields.sedexServiceCode : this.#apiFields.pacServiceCode
        const baseParams = this.#_formatBaseParams(originZipcode, destinyZipcode, product, serviceType)
        return this.#_formatCalcPrecoRequestCall(baseParams, originZipcode, destinyZipcode)
    }

}

module.exports = { ZipcodeClient }