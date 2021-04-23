const { ClassManager } = require('../../utils/class_manager')
const { TestManager } = require('../configs/index')
const { requestValues, baseParams, formattedResponse, unformattedResponse } = require('../configs/mock/api.mock')
const testManager = new TestManager()
const zipcodeApiFieldsFormatter = ClassManager.getZipcodeApiFieldsFormatter


console.log('TEST CASES FOR ZIPCODE API FIELD FORMATTER\n')
console.log('------------------\n')
testManager.testFunction(
    'Zipcode api fields formatter, formating base params',
    zipcodeApiFieldsFormatter.formatBaseParams.bind(zipcodeApiFieldsFormatter),
    baseParams,
    [
        requestValues.originZipcode,
        requestValues.destinyZipcode,
        requestValues.product,
        requestValues.serviceType
    ]
)

testManager.testFunction(
    'Zipcode api fields formatter, formating CalcPreco api response',
    zipcodeApiFieldsFormatter.formattedCalcPrecoResponse.bind(zipcodeApiFieldsFormatter),
    formattedResponse,
    [
        unformattedResponse,
        requestValues.originZipcode,
        requestValues.destinyZipcode
    ]
)

console.log('------------------\n')