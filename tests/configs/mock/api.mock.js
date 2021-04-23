const {
    standardResponseOriginZipcode,
    standardResponseDestinyZipcode,
    product
} = require('./standard.mock')

const formattedResponse = {
    'value': 11.11,
    'serviceType': 'PAC',
    'originCep': standardResponseOriginZipcode,
    'destinyCep': standardResponseDestinyZipcode,
    'deliveryTime': 1
}


const unformattedResponse = {
    'CalcPrecoPrazoResult': {
        'Servicos': {
            'cServico': [{
                'Codigo': 4510,
                'Valor': `${formattedResponse.value}`,
                'PrazoEntrega': '1',
                'ValorMaoPropria': '0,00',
                'ValorAvisoRecebimento': '0,00',
                'ValorValorDeclarado': '0,00',
                'EntregaDomiciliar': 'S',
                'EntregaSabado': 'N',
                'Erro': '0',
                'MsgErro': '',
                'ValorSemAdicionais': '86,10',
                'obsFim': ''
            }]
        }
    }
}



const baseParams = {
    'nCdServico': '4510',
    'sCepOrigem': standardResponseOriginZipcode,
    'sCepDestino': standardResponseDestinyZipcode,
    'nVlPeso': product.weight,
    'nVlAltura': product.height.toFixed(1),
    'nVlLargura': product.width.toFixed(1),
    'nVlComprimento': product.length.toFixed(1),
    'nVlDiametro': product.diameter.toFixed(1),
    'nCdEmpresa': '',
    'sDsSenha': '',
    'sCdMaoPropria': 'n',
    'nVlValorDeclarado': 0,
    'sCdAvisoRecebimento': 'n',
    'StrRetorno': 'xml'
}

const requestValues = {
    'originZipcode': standardResponseOriginZipcode,
    'destinyZipcode': standardResponseDestinyZipcode,
    'product': product,
    'serviceType': '4510'
}

module.exports = {
    requestValues,
    baseParams,
    formattedResponse,
    unformattedResponse
}