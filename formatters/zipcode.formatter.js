class ZipcodeFormatter {

    formatArrayOfZipcodes(zipcodes, pattern, isToSplit) {
        return zipcodes.map((zipcode) => isToSplit ? this.split(zipcode, pattern) : this.replace(zipcode, pattern))
    }

    getZipcodeRange(
        firstZipcode,
        lastZipcode,
        isToVariyFirstPart,
    ) {
        const zipcodeRange = []
        firstZipcode = this.split(firstZipcode, '-')
        lastZipcode = this.split(lastZipcode, '-')
        let initiZipcodePart = Number(firstZipcode[isToVariyFirstPart ? 0 : 1])
        let finalZipcodePart = Number(lastZipcode[isToVariyFirstPart ? 0 : 1])
        let nonVariyPart = firstZipcode[isToVariyFirstPart ? 1 : 0]
        for (let currentZipcode = initiZipcodePart; currentZipcode <= finalZipcodePart; currentZipcode++) {
            let zipcode = `${currentZipcode}`
            if (zipcode.length === 1) {
                zipcode = `00${zipcode}`
            }
            zipcode = isToVariyFirstPart ? `${zipcode}${nonVariyPart}` : `${nonVariyPart}${zipcode}`
            zipcodeRange.push(zipcode)
        }
        return zipcodeRange

    }

    split(zipcode, pattern) {
        return zipcode.split(pattern)
    }

    replace(zipcode, pattern) {
        return zipcode.replace(pattern, '')
    }
}

module.exports = { ZipcodeFormatter }