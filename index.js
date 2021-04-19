// const calculateShipping = (product, zipcodes, callback) => {
//     const http = require('http')
//     const baseApiUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco'
//     const requestsList = getRequestsList(product, zipcodes, baseApiUrl)
//     const t = 'nCdEmpresa=&sDsSenha=&sCepOrigem=70002900&sCepDestino=04547000&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3'
//     // zipcodes.map((zipcode) => zipcode.replace('-',''))
//     //     http.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco?n',(res) =>{
//     //         const body = res.setEncoding('utf-8')
//     //         body.on('data',(e) =>{
//     //             console.log(e)
//     //             const r = new RegExp(/<Valor>\d.*<\/Valor>/)
//     //             console.log(e.match(r))
//     //         })
//     // })
// }

// function getRequestsList(product, zipcodes, baseApi) {
//     const requests = []
//     zipcodes.forEach((zipcode) => {
//         zipcode = zipcode.replace('-', '')
//         `${baseApi}?`
//     })
// }

// function formatApiUrl(zipcodeOrgin,zipCodeDestiny){

// }

// const zipcodes = [
//     '02739-000',
//     '22050-002',
//     '31630-900',
//     '32040-630',
//     '32600-100',
//     '14010-000',
//     '24020-030',
//     '35740-000',
//     '29300-100',
//     '29900-200'
// ]

// const productTosend = {
//     'wheigth': 2,
//     'productLength': 10,
//     'productWithd': 10,
//     'productHeigth': 10,

// }
// calculateShipping(zipcodes, productTosend, (result) => {
//     console.log(result)
// })

// // nCdEmpresa=&sDsSenha=&sCepOrigem=70002900&sCepDestino=04547000&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3

const originZipcodes = [
    '02739-000',
    '22050-002',
    '31630-900',
    '32040-630',
    '32600-100',
    '14010-000',
    '24020-030',
    '35740-000',
    '29300-100',
    '29900-200'
]

const destinyZipcodesRanges = ['59980-000', '59985-000']

const product = {

}

function calculateShippestShipping(originZipcodes, destinyZipcodeRange) {
    const baseApi = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco'
    originZipcodes.map(formatZipcode)
    const destinyZipcodes = formatZipcodeRange(destinyZipcodeRange)
    const requestsList = getRequetsList()
}

function formatZipcode(zipcode) {
    return zipcode.replace('-', '')
}

function formatZipcodeRange(destinyZipcodeRange) {
    let [initial, last] = destinyZipcodeRange
    const destinyZipcodes = []
    initial = Number(formatZipcode(initial))
    last = Number(formatZipcode(last))
    for (let currentZipcode = initial; currentZipcode <= last; currentZipcode++) {
        destinyZipcodes.push(currentZipcode)
    }
    return destinyZipcodes
}

function getRequetsList(zipcodes, destinyZipcode, product) {
    const requestsList = []
    zipcodes.forEach((zipcode) => [
        destinyZipcode.forEach((destinyZipcode) => {
            // TODO: formatar URL
        })
    ])
}

calculateShippestShipping(originZipcodes, destinyZipcodesRanges)