# wifi-on-ice-portal-client

**Query information from the [WifiOnICE portal](https://www.bahn.com/en/view/trains/on-board-service/wifi.shtml) in [German ICE trains](https://en.wikipedia.org/wiki/Intercity-Express).**

A lot of the [features of the portal](https://gist.github.com/derhuerst/bdca32a50c7ca4a004cee90745a7f68c) are not covered yet.

[![npm version](https://img.shields.io/npm/v/wifi-on-ice-portal-client.svg)](https://www.npmjs.com/package/wifi-on-ice-portal-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/wifi-on-ice-portal-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install wifi-on-ice-portal-client
```


## Usage

```js
const portal = require('wifi-on-ice-portal-client')

portal.status()
.then(console.log)
.catch(console.error)
```

```js
{
	serviceLevel: 'AVAILABLE_SERVICE',
	internet: 'HIGH',
	latitude: 51.2719795,
	longitude: 13.4613135,
	tileY: 141,
	tileX: 275,
	series: '411',
	serverTime: 1635252079700,
	speed: 0,
	trainType: 'ICE',
	tzn: 'Tz1178',
	wagonClass: 'FIRST',
	connectivity: {
		currentState: 'HIGH',
		nextState: 'UNSTABLE',
		remainingTimeSeconds: 3600
	},
	bapInstalled: true,
	ok: true,
	gpsOk: true
}
```


## API

## `portal.status()`

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## `portal.journey()`

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with a [*Friendly Public Transport Format* `1.0.1` `journey`](https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md#journey) leg, similar to [`db-hafas`](https://github.com/derhuerst/db-hafas#db-hafas). It looks like this:

```js
{
	public: true,
	mode: 'train',
	line: { type: 'line', id: 'ice-1556', name: 'ICE 1556' },
	traveledDistance: 44502,
	distanceToPreviousStop: 62523,
	totalDistance: 436961,
	next: {
		type: 'station',
		id: '8010205_00',
		name: 'Leipzig Hbf',
		location: { type: 'location', latitude: 51.345471, longitude: 12.382064 }
	},
	scheduledNext: {
		type: 'station',
		id: '8010205_00',
		name: 'Leipzig Hbf',
		location: { type: 'location', latitude: 51.345471, longitude: 12.382064 }
	},
	previous: {
		type: 'station',
		id: '8010297_00',
		name: 'Riesa',
		location: { type: 'location', latitude: 51.309654, longitude: 13.287734 }
	},
	last: {
		type: 'station',
		id: '8070003_00',
		name: 'Frankfurt (M) Flughafen Fernbf',
		location: { type: 'location', latitude: 50.053167, longitude: 8.570185 }
	},
	passed: [
		{
			station: {
				type: 'station',
				id: '8010085_00',
				name: 'Dresden Hbf',
				location: { type: 'location', latitude: 51.040563, longitude: 13.732035 }
			},
			arrival: null,
			arrivalDelay: null,
			arrivalPlatform: '3',
			departure: '2021-10-26T14:16:00+02:00',
			departureDelay: 300,
			departurePlatform: '3',
			passed: true,
			kmFromStart: 0,
			delayReasons: null
		},
		{
			station: {
				type: 'station',
				id: '8010089_00',
				name: 'Dresden-Neustadt',
				location: { type: 'location', latitude: 51.065899, longitude: 13.740701 }
			},
			arrival: '2021-10-26T14:20:00+02:00',
			arrivalDelay: 300,
			arrivalPlatform: '6',
			departure: '2021-10-26T14:22:00+02:00',
			departureDelay: 300,
			departurePlatform: '6',
			passed: true,
			kmFromStart: 2.882,
			delayReasons: [ { code: '36', text: 'Reparatur am Zug' } ]
		},
		// ...
		{
			station: {
				type: 'station',
				id: '8000105_00',
				name: 'Frankfurt (Main) Hbf',
				location: { type: 'location', latitude: 50.107145, longitude: 8.663789 }
			},
			arrival: '2021-10-26T18:38:00+02:00',
			arrivalDelay: 120,
			arrivalPlatform: '7',
			departure: '2021-10-26T18:44:00+02:00',
			departureDelay: 120,
			departurePlatform: '7',
			passed: false,
			kmFromStart: 427.979,
			delayReasons: [ { code: '36', text: 'Reparatur am Zug' } ]
		},
		{
			station: {
				type: 'station',
				id: '8070003_00',
				name: 'Frankfurt (M) Flughafen Fernbf',
				location: { type: 'location', latitude: 50.053167, longitude: 8.570185 }
			},
			arrival: '2021-10-26T18:57:00+02:00',
			arrivalDelay: 120,
			arrivalPlatform: 'Fern 7',
			departure: null,
			departureDelay: null,
			departurePlatform: 'Fern 7',
			passed: false,
			kmFromStart: 436.961,
			delayReasons: [ { code: '36', text: 'Reparatur am Zug' } ]
		}
	]
}
```


## Related

- [`wifi-on-ice-position-stream`](https://github.com/derhuerst/wifi-on-ice-position-stream) – A stream of ICE positions, taken from the on-board WiFi.
- [`record-ice-movement`](https://github.com/derhuerst/record-ice-movement) – Record the movement of any ICE using the on-board WiFi.
- [`sncf-wifi-portal-client`](https://github.com/derhuerst/sncf-wifi-portal-client) – Query information from the SNCF WiFi portal in French TGV trains.
- [`digital-im-regio-portal-client`](https://github.com/derhuerst/digital-im-regio-portal-client) – Query information from the Digital im Regio portal in German Regio trains.
- [`cd-wifi-client`](https://github.com/derhuerst/cd-wifi-client) – A client for the onboard WiFi portal of České dráhy (Czech Railways) trains.


## Contributing

If you have a question or have difficulties using `wifi-on-ice-portal-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/wifi-on-ice-portal-client/issues).
