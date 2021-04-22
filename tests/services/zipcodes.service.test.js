const { TestCases } = require('../configs')
const { ZipcodeService } = require('../../services/zipcode/zipcode.service')
const { FakeZipCodeClient } = require('../configs/utils/zipcode.client.server')
const testCases = new TestCases()
const fakeZipcodeClient = new FakeZipCodeClient()
const zipcodeService = new ZipcodeService(fakeZipcodeClient)
const {
    destinyZipcodes,
    originZipcodes,
    product,
    response } = require('../configs/utils/server/mock/server.mock')

testCases.testeAsyncFunction(
    '',
    zipcodeService.calculateTheShippestShippingService.bind(zipcodeService),
    response,
    [originZipcodes, destinyZipcodes, product]
)
