class ClassManager {
    static get getZipcodeApiFields() {
        const { ZipcodeApiFields } = require('./zipcode_fields')
        return ZipcodeApiFields
    }

    static get getZipcodeObjectFields() {
        const { ZipcodeObjectFields } = require('./zipcode_fields')
        return ZipcodeObjectFields
    }

    static get getZipcodeFormatter() {
        const { ZipcodeFormatter } = require('../formatters/zipcode.formatter')
        return new ZipcodeFormatter()
    }


    static get getZipcodeApiFieldsFormatter() {
        const { ZipcodeApiFieldsFormatter } = require('../formatters/zipcode_api_fields.formatter')
        const zipcodeApiFields = ClassManager.getZipcodeApiFields
        const zipcodeObjectFields = ClassManager.getZipcodeObjectFields
        return new ZipcodeApiFieldsFormatter(zipcodeApiFields, zipcodeObjectFields)
    }


    static get getZipcodeApiClient() {
        const { ZipcodeClient } = require('../client/zipcode.client')
        const soap = require('soap')
        const formatter = ClassManager.getZipcodeApiFieldsFormatter
        const apiFields = ClassManager.getZipcodeApiFields
        return new ZipcodeClient(soap, formatter, apiFields)
    }

    static get getZipcodeService() {
        const { ZipcodeService } = require('../services/zipcode.service')
        const client = ClassManager.getZipcodeApiClient
        return new ZipcodeService(client)
    }
}

module.exports = { ClassManager }