const { readFile } = require("fs").promises

class EusebioData {
	constructor ({ file }) {
		this.file = file
	}

	async dataContent() {
		return JSON.parse(await readFile(this.file))
	}

	async find(route) {
		const data = await this.dataContent()

		if (!route) return data

		return data.find(({role}) => route === role)
	}
}

module.exports = EusebioData