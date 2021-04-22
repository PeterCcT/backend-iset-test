function getZipcodeService() {
    const { ZipcodeClient } = require('../client/zipcode.client')
    const { ZipcodeService } = require('../services/zipcode/zipcode.service')
    const client = new ZipcodeClient()
    const service = new ZipcodeService(client)
    return service
}


module.exports = { getZipcodeService }