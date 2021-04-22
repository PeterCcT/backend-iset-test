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

const destinyZipcodesRanges = ['59980-000', '59983-000']

const product = {
    'weigth': 2,
    'width': 15,
    'height': 10,
    'length': 16,
    'diameter': 0,
}

const { getZipcodeService } = require('./services')
const { ZipcodeFormatter } = require('./formatters/zipcode.formatter')
const zipcodeFormatter = new ZipcodeFormatter()
const zipcodeService = getZipcodeService()

zipcodeService.calculateTheShippestShippingService(
    zipcodeFormatter.formatArrayOfZipcodes(originZipcodes, '-', false),
    zipcodeFormatter.getZipcodeRange(destinyZipcodesRanges[0], destinyZipcodesRanges[1], true),
    product
).then(shippestShipping => {
    console.log('A entrega mais barata é: ', shippestShipping)
})
