const http = require("http")
const PORT = 3000
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const { genEusebio } = require('./src/data')
const apis =  genEusebio()

const routes = {
	'/api:get': async (request, response) => {
		const { role } = request.queryString
		const roles = await apis.find(role)
		response.write(JSON.stringify({ ...roles }))
		return response.end()
	},

	default: (request, response) => {
		response.write('API')
		response.end()
	}
}

const handler = (request, response) => {
	const { url, method } = request
	const [ indexRoute , api , secondRoute ] = url.split('/')
	request.queryString = { role: secondRoute }

	const key = `/${api}:${method.toLowerCase()}`

	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

	response.writeHead(200, DEFAULT_HEADER)

	const chosen = routes[key] || routes.default
	return chosen(request, response)
}

http.createServer(handler)
.listen(PORT, () => console.log(`Server stared: \nacess: http://localhost:${PORT}/`))



