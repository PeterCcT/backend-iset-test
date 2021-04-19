const calculateShipping = (product, zipcodes, callback) => {
    const http = require('http')
    const baseApiUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco'
    const requestsList = getRequestsList(product, zipcodes, baseApiUrl)
    // zipcodes.map((zipcode) => zipcode.replace('-',''))
    //     http.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx/CalcPreco?n',(res) =>{
    //         const body = res.setEncoding('utf-8')
    //         body.on('data',(e) =>{
    //             console.log(e)
    //             const r = new RegExp(/<Valor>\d.*<\/Valor>/)
    //             console.log(e.match(r))
    //         })
    // })
}

function getRequestsList(product, zipcodes, baseApi) {
    const requests = []
    zipcodes.forEach((zipcode) => {
        zipcode = zipcode.replace('-', '')
        
    })
}

const zipcodes = [
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

const productTosend = {
    'wheigth': 2,
    'productLength': 10,
    'productWithd': 10,
    'productHeigth': 10,

}
calculateShipping(zipcodes, productTosend, (result) => {
    console.log(result)
})

// nCdEmpresa=&sDsSenha=&sCepOrigem=70002900&sCepDestino=04547000&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3