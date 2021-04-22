const standardResponseOriginZipcode = '11111111'
const standardResponseDestinyZipcode = '22222222'

const originZipcodes = [
    '33333333',
    '555555555',
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
    'weigth': 2,
    'width': 15,
    'height': 10,
    'length': 16,
    'diameter': 0,
}

const response = {
    value: 11.11,
    serviceType: 'PAC',
    originCep: standardResponseOriginZipcode,
    destinyCep: standardResponseDestinyZipcode,
    deliveryTime: 1
}

module.exports = {
    originZipcodes,
    destinyZipcodes,
    product,
    standardResponseOriginZipcode,
    standardResponseDestinyZipcode,
    response
}