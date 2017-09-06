'use strict'

const test = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const portal = require('.')

const minute = 60 * 1000

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
