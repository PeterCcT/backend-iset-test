const standardResponseOriginZipcode = '11111111'
const standardResponseDestinyZipcode = '22222222'

const originZipcodes = [
    '33333333',
    '55555555',
    '99999999',
    standardResponseOriginZipcode
]
const destinyZipcodes = [
    '22220222',
    '22221222',
    '22223222',
    standardResponseDestinyZipcode
]

const product = {
    'weight': '2',
    'width': 15,
    'height': 10,
    'length': 16,
    'diameter': 0,
}

module.exports = {
    standardResponseOriginZipcode,
    standardResponseDestinyZipcode,
    originZipcodes,
    destinyZipcodes,
    product
}