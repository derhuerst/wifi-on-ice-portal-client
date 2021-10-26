'use strict'

const test = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const portal = require('.')

const minute = 60 * 1000

const isValidDate = (d) => {
	return 'string' === typeof d && !Number.isNaN(+new Date(d))
}

test('status', (t) => {
	t.plan(8)

	portal.status()
	.then((data) => {
		t.equal(data.ok, true)
		t.equal(typeof data.speed, 'number')
		t.ok(data.speed >= 0)
		t.ok(data.speed < 500)
		t.equal(data.gpsOk, true)
		t.ok(isRoughlyEqual(10, data.latitude, 49))
		t.ok(isRoughlyEqual(10, data.longitude, 10))
		t.ok(isRoughlyEqual(10 * minute, data.serverTime, Date.now()))
	})
	.catch(t.ifError)
})

test('journey', (t) => {
	portal.journey()
	.then((leg) => {
		t.equal(leg.public, true)
		t.equal(leg.mode, 'train')

		t.ok(leg.line)
		t.equal(leg.line.type, 'line')
		t.equal(typeof leg.line.id, 'string')
		t.ok(leg.line.id)
		t.equal(typeof leg.line.name, 'string')
		t.ok(leg.line.name)

		if (leg.next) t.equal(leg.next.type, 'station')
		if (leg.previous) t.equal(leg.previous.type, 'station')
		t.ok(leg.last)
		t.equal(leg.last.type, 'station')

		t.ok(Array.isArray(leg.passed))
		for (let i = 0; i < leg.passed.length; i++) {
			const p = leg.passed[i]
			const msg = 'passed ' + i
			t.ok(p, msg)

			t.ok(p.station, msg)
			t.equal(typeof p.station.id, 'string', msg)
			t.ok(p.station.id, msg)
			t.equal(typeof p.station.name, 'string', msg)
			t.ok(p.station.name, msg)

			const l = p.station.location
			t.ok(l, msg)
			t.equal(l.type, 'location', msg)
			t.ok(isRoughlyEqual(10, l.latitude, 49), msg)
			t.ok(isRoughlyEqual(10, l.longitude, 10), msg)

			if (p.arrival) t.ok(isValidDate(p.arrival), msg)
			if (p.departure) t.ok(isValidDate(p.departure), msg)

			if (p.arrivalDelay !== null) {
				t.equal(typeof p.arrivalDelay, 'number', msg)
			}
			if (p.departureDelay !== null) {
				t.equal(typeof p.departureDelay, 'number', msg)
			}

			if (p.arrivalPlatform) {
				t.equal(typeof p.arrivalPlatform, 'string', msg)
				t.ok(p.arrivalPlatform, msg)
			}
			if (p.departurePlatform) {
				t.equal(typeof p.departurePlatform, 'string', msg)
				t.ok(p.departurePlatform, msg)
			}

			t.equal(typeof p.passed, 'boolean', msg)
			t.equal(typeof p.kmFromStart, 'number', msg)
			t.ok(p.kmFromStart >= 0, msg)

			if (p.delayReasons) {
				t.ok(p.delayReasons instanceof Array, msg)
			}
		}

		t.end()
	})
	.catch(t.ifError)
})
