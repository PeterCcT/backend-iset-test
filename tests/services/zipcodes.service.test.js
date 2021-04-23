const { TestCases } = require('../configs')
const { ZipcodeService } = require('../../services/zipcode/zipcode.service')
const { FakeZipCodeClient } = require('./server/zipcode.client.server')
const testCases = new TestCases()
const fakeZipcodeClient = new FakeZipCodeClient()
const zipcodeService = new ZipcodeService(fakeZipcodeClient)
const {
    destinyZipcodes,
    originZipcodes,
    product,
    response } = require('./server/mock/server.mock')

console.log('TEST CASES FOR ZIPCODE SERVICE\n')
console.log('------------------\n')

testCases.testeAsyncFunction(
    'The shipest shipping by zipcode on ZipcodeService',
    zipcodeService.calculateTheShippestShippingService.bind(zipcodeService),
    response,
    [originZipcodes, destinyZipcodes, product]
).finally(() => {
    console.log('------------------\n')
})
