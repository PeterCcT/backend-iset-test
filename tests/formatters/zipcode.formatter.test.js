const { ClassManager } = require('../../utils/class_manager')
const { TestManager } = require('../configs')
const testCases = new TestManager()
const zipcodeFormatter = ClassManager.getZipcodeFormatter

console.log('TEST CASES FOR ZIPCODE FORMATTER\n')
console.log('------------------\n')

testCases.testFunction(
    'Zipcode formatter, replace method',
    zipcodeFormatter.replace.bind(zipcodeFormatter),
    '12345789',
    ['12345-789', '-'],
)

testCases.testFunction(
    'Zipcode formatter, split method',
    zipcodeFormatter.split.bind(zipcodeFormatter),
    ['12345', '789'],
    ['12345-789', '-']
)

testCases.testFunction(
    'Zipcode formatter, replace method with array',
    zipcodeFormatter.formatArrayOfZipcodes.bind(zipcodeFormatter),
    ['12345789', '78956123'],
    [['12345-789', '78956-123'], '-', false]
)

testCases.testFunction(
    'Zipcode formatter, split method with array',
    zipcodeFormatter.formatArrayOfZipcodes.bind(zipcodeFormatter),
    [['12345', '789'], ['78956', '123']],
    [['12345-789', '78956-123'], '-', true]
)

testCases.testFunction(
    'Zipcode formatter, get range of ceps varying first part',
    zipcodeFormatter.getZipcodeRange.bind(zipcodeFormatter),
    ['10000000', '10001000', '10002000', '10003000'],
    ['10000-000', '10003-000', true]
)

testCases.testFunction(
    'Zipcode formatter, get range of ceps varying second part',
    zipcodeFormatter.getZipcodeRange.bind(zipcodeFormatter),
    ['10000001', '10000002', '10000003', '10000004'],
    ['10000-001', '10000-004', false]
)

console.log('------------------\n')

