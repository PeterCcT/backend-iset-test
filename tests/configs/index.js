class TestCases {

    constructor() {
        const { performance } = require('perf_hooks')
        this.#assert = require('assert')
        this.#performance = performance
    }

    #assert
    #performance

    testFunction(name, fn, expected, args) {
        const startTime = this.#performance.now()
        let result
        const isExpectingAnObject = typeof (expected) === 'object'
        try {
            console.log(`TESTING: ${name}`)
            result = fn(...args)
            isExpectingAnObject ? this.#assert.deepStrictEqual(result, expected) : this.#assert.strictEqual(result, expected)
            console.log('STATUS: 🆗')
        } catch (error) {
            console.error(`STATUS: ❌`)
            console.log(`EXPECTED: ${JSON.stringify(expected)}\nRECEIVED: ${JSON.stringify(result)}`)
            console.log(`Error log: ${error}`)
        } finally {
            const endTime = this.#performance.now()
            console.log(`TIME: ${endTime - startTime}ms\n`)

        }
    }

    async testeAsyncFunction(name, fn, expected, args) {
        const startTime = this.#performance.now()
        let result
        const isExpectingAnObject = typeof (expected) === 'object'
        try {
            console.log(`ASYNC TESTING: ${name}`)
            result = await fn(...args)
            isExpectingAnObject ? this.#assert.deepStrictEqual(result, expected) : this.#assert.strictEqual(result, expected)
            console.log('STATUS: 🆗 \n')
        } catch (error) {
            console.error(`STATUS: ❌ \n`)
            console.log(`EXPECTED: ${JSON.stringify(expected)}\nRECEIVED: ${JSON.stringify(result)}`)
            console.log(`Error log: ${error}\n`)
        } finally {
            const endTime = this.#performance.now()
            console.log(`TIME: ${endTime - startTime}ms\n`)
        }
    }

}

module.exports = { TestCases }