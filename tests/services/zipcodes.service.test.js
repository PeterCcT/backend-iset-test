const { TestManager } = require('../configs')
const { ZipcodeService } = require('../../services/zipcode.service')
const { FakeZipCodeClient } = require('./server/zipcode.client.server')
const testCases = new TestManager()
const fakeZipcodeClient = new FakeZipCodeClient()
const zipcodeService = new ZipcodeService(fakeZipcodeClient)
const { formattedResponse } = require('../configs/mock/api.mock')
const {
    destinyZipcodes,
    originZipcodes,
    product,
} = require('../configs/mock/standard.mock')

console.log('TEST CASES FOR ZIPCODE SERVICE\n')
console.log('------------------\n')

testCases.testeAsyncFunction(
    'The cheaper shipping by zipcode on ZipcodeService',
    zipcodeService.calculateTheCheaperShippingService.bind(zipcodeService),
    formattedResponse,
    [originZipcodes, destinyZipcodes, product]
).finally(() => {
    console.log('------------------\n')
})
