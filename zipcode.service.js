class ZipcodeService {
    #baseApiUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco'
    #baseQueryParams = {
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
    #baseServices = Object.freeze({
        'SEDEX': '04014',
        'PAC': '04510'
    })

    #_formatBaseQueryParams(originZipcodes, destinyZipcode, product) {
        const queryParams = { ...this.#baseQueryParams }
        queryParams.sCepOrigem = originZipcodes
        queryParams.sCepDestino = destinyZipcode
        queryParams.nVlPeso = product.weigth.toString()
        queryParams.nVlAltura = product.height.toFixed(1)
        queryParams.nVlLargura = product.width.toFixed(1)
        queryParams.nVlComprimento = product.length.toFixed(1)
        queryParams.nVlDiametro = product.diameter.toFixed(1)
        return queryParams
    }

    #_formatRequest(originZipcodes, destinyZipcode, product) {
        let requestQuery = ''
        const queryParams = this.#_formatBaseQueryParams(originZipcodes, destinyZipcode, product)
        for (const queryKey in queryParams) {
            requestQuery += `${queryKey}=${queryParams[queryKey]}&`
        }
        return `${this.#baseApiUrl}?${requestQuery}`
    }

    #_formatRequestUrlWithService(serviceType, url) {
        return `${url}nCdServico=${serviceType}`
    }

    #_getRequestsUrls(originZipcodes, destinyZipcodes, product) {
        const urls = []
        for (const originZipcode of originZipcodes) {
            for (const destinyZipcode of destinyZipcodes) {
                const formattedRequestUrl = this.#_formatRequest(originZipcode, destinyZipcode, product)
                const sedexRequestUrl = this.#_formatRequestUrlWithService(this.#baseServices.SEDEX, formattedRequestUrl)
                const pacRequestUrl = this.#_formatRequestUrlWithService(this.#baseServices.PAC, formattedRequestUrl)
                urls.push(sedexRequestUrl, pacRequestUrl)
            }
        }
        return urls
    }

    #_prepareRequests(requests) {
        const { Promissifier } = require('./utils/promissifies')
        const asyncRequests = []
        for (const url of requests) {
            asyncRequests.push(Promissifier.promissifyGetHttpRequest(url))
        }
        return asyncRequests
    }


    async calculateTheShippestShippingService(originZipcodes, destinyZipcodes, product) {
        const requestsUrls = this.#_getRequestsUrls(originZipcodes, destinyZipcodes, product)
        const preparedRequests = this.#_prepareRequests(requestsUrls)
        console.log(preparedRequests)
        const a = await Promise.all(preparedRequests)
        console.log(a)
    }
}

module.exports = { ZipcodeService }