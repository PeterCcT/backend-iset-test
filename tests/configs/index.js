class TestCases {

    constructor() {
        this.#assert = require('assert')
    }

    #assert

    testFunction(name, fn, expected, args) {
        let result
        const isExpectingAnObject = typeof (expected) === 'object'
        try {
            console.log(`TESTING: ${name}`)
            result = fn(...args)
            isExpectingAnObject ? this.#assert.deepStrictEqual(result, expected) : this.#assert.strictEqual(result, expected)
            console.log('STATUS: 🆗 \n')
        } catch (error) {
            console.error(`STATUS: ❌ \n`)
            console.log(`EXPECTED ${expected}\nRECEIVED ${result}`)
            console.log(`Error log: ${error}\n`)
        }
    }

    testeAsyncFunction(name, fn, expected, args) {
        let result
        const isExpectingAnObject = typeof (expected) === 'object'
        try {
            console.log(`TESTING: ${name}`)
            fn(...args).then((res) => {
                result = res
                isExpectingAnObject ? this.#assert.deepStrictEqual(result, expected) : this.#assert.strictEqual(result, expected)
                console.log('STATUS: 🆗 \n')
            })
        } catch (error) {
            console.error(`STATUS: ❌ \n`)
            console.log(`EXPECTED ${expected}\nRECEIVED ${result}`)
            console.log(`Error log: ${error}\n`)
        }
    }

}

module.exports = { TestCases }