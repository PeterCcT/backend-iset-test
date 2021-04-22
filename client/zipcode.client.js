class ZipcodeClient {
    constructor() {
        this.soapClient = require('soap')
    }
    #baseApiUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
    #baseServices = Object.freeze({
        'SEDEX': '4014',
        'PAC': '4510'
    })
    #baseParams = {
        'nCdEmpresa': '',
        'sDsSenha': '',
        'sCepOrigem': '',
        'sCepDestino': '',
        'nCdFormato': 1,
        'nVlPeso': 0,
        'nVlAltura': 0,
        'nVlComprimento': 0,
        'nVlLargura': 0,
        'nVlDiametro': 0,
        'sCdMaoPropria': 'n',
        'nVlValorDeclarado': 0,
        'sCdAvisoRecebimento': 'n',
        'StrRetorno': 'xml'
    }

    soapClient

    #_formatBaseParams(originZipcode, destinyZipcode, product) {
        const requestParams = { ...this.#baseParams }
        requestParams.sCepOrigem = originZipcode
        requestParams.sCepDestino = destinyZipcode
        requestParams.nVlPeso = product.weigth.toString()
        requestParams.nVlAltura = product.height.toFixed(1)
        requestParams.nVlLargura = product.width.toFixed(1)
        requestParams.nVlComprimento = product.length.toFixed(1)
        requestParams.nVlDiametro = product.diameter.toFixed(1)
        return requestParams
    }

    #_formatServiceParam(serviceType, baseParams) {
        baseParams[`nCdServico`] = serviceType
        return baseParams
    }

    get #_apiClient() {
        return this.soapClient.createClientAsync(this.#baseApiUrl, {
            wsdl_options: { timeout: 20000 }
        })
    }

    #_formatCalcPrecoResponse(result, params) {
        const [calcPrecoResult] = result
        const serviceResult = calcPrecoResult['CalcPrecoPrazoResult']['Servicos']['cServico'][0]
        const error = serviceResult['Erro']
        const theServiceResultContainsError = error !== '0' || error === ''
        if (theServiceResultContainsError)
            return {}
        const serviceCode = serviceResult['Codigo'].toString()
        serviceResult['deliveryTime'] = Number(serviceResult['PrazoEntrega'])
        serviceResult['value'] = Number(serviceResult['Valor'].replace(',', '.'))
        serviceResult['originCep'] = params['sCepOrigem']
        serviceResult['destinyCep'] = params['sCepDestino']
        serviceResult['Codigo'] = this.#baseServices.SEDEX === serviceCode ? 'SEDEX' : 'PAC'
        return serviceResult
    }

    async #_formatCalcPrecoRequestResponseCall(client, params) {
        const result = await client.CalcPrecoPrazoAsync(params)
        const formattedResponse = this.#_formatCalcPrecoResponse(result, params)
        return formattedResponse
    }

    async #_formatCalcPrecoRequestCall(params) {
        const client = await this.#_apiClient
        return this.#_formatCalcPrecoRequestResponseCall(client, params)
    }



    getCalcPrecoRequestCall(origingZipcode, destinyZipcode, product, isSedex) {
        const serviceType = isSedex ? this.#baseServices.SEDEX : this.#baseServices.PAC
        const baseParams = this.#_formatBaseParams(origingZipcode, destinyZipcode, product)
        const serviceParam = this.#_formatServiceParam(serviceType, baseParams)
        return this.#_formatCalcPrecoRequestCall(serviceParam)
    }

}

module.exports = { ZipcodeClient }