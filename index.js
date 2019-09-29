'use strict'

const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const omit = require('lodash.omit')
const moment = require('moment-timezone')
const slugg = require('slugg')

const endpoint = 'https://iceportal.de/api1/rs/'
// const endpoint = 'https://portal.imice.de/api1/rs/'
const userAgent = 'https://github.com/derhuerst/wifi-on-ice-portal-client'

const request = (route) => {
	if ('string' !== typeof route) throw new Error('route must be a string')

	return fetch(endpoint + route, {
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
	return request('status')
	.then((data) => {
		const res = omit(data, ['connection', 'gpsStatus'])
		res.ok = data.connection
		res.gpsOk = data.gpsStatus === 'VALID'
		if (!res.gpsOk) res.speed = null // speed is always 0 in tunnels
		return res
	})
}

const parseTimestamp = (t) => {
	return moment(t).tz('Europe/Berlin').format()
}

const parsePassed = (_) => {
	const t = _.timetable

	const arr = t.actualArrivalTime
	const schedArr = t.scheduledArrivalTime
	const arrDelay = arr && schedArr ? Math.round((arr - schedArr) / 1000) : null

	const dep = t.actualDepartureTime
	const schedDep = t.scheduledDepartureTime
	const depDelay = dep && schedDep ? Math.round((dep - schedDep) / 1000) : null

	const platform = _.track.actual || _.track.scheduled || null

	// todo: what is _.info.status?
	// todo: _.info.distance
	// todo: _.delayReasons
	return {
		station: {
			type: 'station',
			// todo: the ids looks like "8000169_00", remove last part?
			id: _.station.evaNr,
			name: _.station.name,
			location: Object.assign({type: 'location'}, _.station.geocoordinates)
		},
		arrival: arr || schedArr ? parseTimestamp(arr || schedArr) : null,
		arrivalDelay: arrDelay,
		arrivalPlatform: platform,
		departure: dep || schedDep ? parseTimestamp(dep || schedDep) : null,
		departureDelay: depDelay,
		departurePlatform: platform,
		passed: _.info.passed,
		kmFromStart: _.info.distanceFromStart / 1000
	}
}

const journey = () => {
	return request('tripInfo/trip')
	.then((_) => {
		const passed = _.trip.stops.map(parsePassed)

		const lineName = _.trip.trainType + ' ' + _.trip.vzn
		const lineId = slugg(lineName)

		const s = _.trip.stopInfo
		const findPassed = (prop) => {
			const p = s[prop] && passed.find(p => p.station.id === s[prop])
			return p && p.station || null
		}
		const next = findPassed('actualNext')
		const scheduledNext = findPassed('scheduledNext')
		const previous = findPassed('actualLast')
		const last = findPassed('finalStationEvaNr')

		return {
			// todo: id
			public: true,
			mode: 'train',
			line: {
				type: 'line',
				id: lineId,
				name: lineName
			},
			traveledDistance: _.trip.actualPosition,
			totalDistance: _.trip.totalDistance,
			next, scheduledNext,
			previous,
			last,
			passed
		}
	})
}

module.exports = {status, journey}
