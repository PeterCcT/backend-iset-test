class ZipcodeApiFields {

    static get calcPrecoResult(){
        return 'CalcPrecoPrazoResult'
    }

    static get calcPrecoResultService(){
        return 'Servicos'
    }

    static get calcPrecoServiceArray(){
        return 'cServico'
    } 

    static get sedexServiceCode() {
        return '4014'
    }

    static get pacServiceCode() {
        return '4510'
    }

    static get error() {
        return 'Erro'
    }

    static get serviceTypeCode() {
        return 'Codigo'
    }

    static get deliveryTime() {
        return 'PrazoEntrega'
    }

    static get value() {
        return 'Valor'
    }

    static get originCep() {
        return 'sCepOrigem'
    }

    static get destinyCep() {
        return 'sCepDestino'
    }

    static serviceType(serviceCode) {
        return serviceCode === ZipcodeApiFields.sedexServiceCode ? 'SEDEX' : 'PAC'
    }

    static get serviceTypeParam() {
        return 'nCdServico'
    }

    static get enterpriseCodeParam() {
        return 'nCdEmpresa'
    }

    static get passwordAccessToServiceParam() {
        return 'sDsSenha'
    }

    static get cepOriginParam() {
        return 'sCepOrigem'
    }

    static get cepDestinyParam() {
        return 'sCepDestino'
    }

    static get deliveryFormatParam() {
        return 'nCdFormato'
    }

    static get productWeightParam() {
        return 'nVlPeso'
    }

    static get productHeightParam() {
        return 'nVlAltura'
    }

    static get productLengthParam() {
        return 'nVlComprimento'
    }

    static get productWidthParam() {
        return 'nVlLargura'
    }

    static get productDiameterParam() {
        return 'nVlDiametro'
    }

    static get deliveryOnHandsParam() {
        return 'sCdMaoPropria'
    }

    static get declaredValueParam() {
        return 'nVlValorDeclarado'
    }

    static get deliveryReceiveNotificationParam() {
        return 'sCdAvisoRecebimento'
    }

    static get apiResponseTypeParam() {
        return 'StrRetorno'
    }
}

class ZipcodeObjectFields {
    static get value() {
        return 'value'
    }

    static get originCep() {
        return 'originCep'
    }

    static get destinyCep() {
        return 'destinyCep'
    }

    static get deliveryTime() {
        return 'deliveryTime'
    }

    static get serviceType() {
        return 'serviceType'
    }
}

module.exports = {
    ZipcodeApiFields,
    ZipcodeObjectFields
}