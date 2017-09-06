'use strict'

const qs = require('querystring')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const omit = require('lodash.omit')

const endpoint = 'https://portal.imice.de/api1/rs/'
const userAgent = 'https://github.com/derhuerst/wifi-on-ice-portal-client'

const request = (route, query) => {
	if ('string' !== typeof route) throw new Error('route must be a string')
	if ('object' !== typeof query) throw new Error('query must be an object')

	const url = endpoint + route + '?' + qs.stringify(query)
	return fetch(url, {
		mode: 'cors',
		redirect: 'follow',
		headers: {'User-Agent': userAgent}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
}

const status = () => {
	return request('status', {})
	.then((data) => {
		const res = omit(data, ['connection', 'gpsStatus'])
		res.ok = data.connection
		res.gpsOk = data.gpsStatus === 'VALID'
		return res
	})
}

module.exports = {status}
