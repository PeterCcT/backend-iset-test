function isObjecEmpty(object) {
    let result = false
    for (const key in object) {
        if (object.hasOwnProperty(key))
            continue
        else {
            result = true
            break
        }

    }
    return result
}

module.exports = {isObjecEmpty}