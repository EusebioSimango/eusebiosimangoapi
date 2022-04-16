const EusebioData = require('./eusebio')

const { join } = require('path')
const filename = join(__dirname, '../database', 'data.json')

const genEusebio = () => {
	const eusebio = new EusebioData ({
		file: filename
	})

	return eusebio
}

module.exports = { genEusebio }
