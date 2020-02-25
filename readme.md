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
	ok: true,
	speed: 245,
	gpsOk: true,
	latitude: 51.86973533333333,
	longitude: 9.989614166666666,
	servicelevel: 'AVAILABLE_SERVICE',
	wagonClass: 'FIRST',
	serverTime: 1504698041985
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
	line: {
		type: 'line',
		id: 'ice-599',
		name: 'ICE 599'
	},
	traveledDistance: 189149, // in meters
	distanceToPreviousStop: 191906, // in meters
	totalDistance: 623577, // in meters
	next: {
		type: 'station',
		id: '8000128_00',
		name: 'Göttingen',
		location: {
			type: 'location',
			latitude: 51.536815,
			longitude: 9.926072
		}
	},
	scheduledNext: {
		type: 'station',
		id: '8000128_00',
		name: 'Göttingen',
		location: {
			type: 'location',
			latitude: 51.536815,
			longitude: 9.926072
		}
	},
	previous: {
		type: 'station',
		id: '8000169_00',
		name: 'Hildesheim Hbf',
		location: {
			type: 'location',
			latitude: 52.160626,
			longitude: 9.953497
		}
	},
	last: {
		type: 'station',
		id: '8000261_00',
		name: 'München Hbf',
		location: {
			type: 'location',
			latitude: 48.140232,
			longitude: 11.558335
		}
	},
	passed: [{
		station: {
			type: 'station',
			id: '8010255_00',
			name: 'Berlin Ostbahnhof',
			location: {
				type: 'location',
				latitude: 52.510977,
				longitude: 13.434564
			}
		},
		arrival: null,
		arrivalDelay: null,
		arrivalPlatform: '6',
		departure: '2017-09-06T11:22:00+02:00',
		departureDelay: 0,
		departurePlatform: '6',
		passed: true,
		kmFromStart: 0
	}, {
		station: {
			type: 'station',
			id: '8011160_00',
			name: 'Berlin Hbf',
			location: {
				type: 'location',
				latitude: 52.525592,
				longitude: 13.369545
			}
		},
		arrival: '2017-09-06T11:30:00+02:00',
		arrivalDelay: 0,
		arrivalPlatform: '14',
		departure: '2017-09-06T11:34:00+02:00',
		departureDelay: 0,
		departurePlatform: '14',
		passed: true,
		kmFromStart: 4.691
	},
	// …
	{
		station: {
			type: 'station',
			id: '8004158_00',
			name: 'München-Pasing',
			location: {
				type: 'location',
				latitude: 48.149852,
				longitude: 11.461872
			}
		},
		arrival: '2017-09-06T19:29:00+02:00',
		arrivalDelay: 120,
		arrivalPlatform: '9',
		departure: '2017-09-06T19:31:00+02:00',
		departureDelay: 120,
		departurePlatform: '9',
		passed: false,
		kmFromStart: 881.612
	}, {
		station: {
			type: 'station',
			id: '8000261_00',
			name: 'München Hbf',
			location: {
				type: 'location',
				latitude: 48.140232,
				longitude: 11.558335
			}
		},
		arrival: '2017-09-06T19:38:00+02:00',
		arrivalDelay: 120,
		arrivalPlatform: '14',
		departure: null,
		departureDelay: null,
		departurePlatform: '14',
		passed: false,
		kmFromStart: 888.851
	}]
}
```


## Related

- [`record-ice-movement`](https://github.com/derhuerst/record-ice-movement) – Record the movement of any ICE using the on-board WiFi.
- [`sncf-wifi-portal-client`](https://github.com/derhuerst/sncf-wifi-portal-client) – Query information from the SNCF WiFi portal in French TGV trains.
- [`digital-im-regio-portal-client`](https://github.com/derhuerst/digital-im-regio-portal-client) – Query information from the Digital im Regio portal in German Regio trains.
- [`cd-wifi-client`](https://github.com/derhuerst/cd-wifi-client) – A client for the onboard WiFi portal of České dráhy (Czech Railways) trains.


## Contributing

If you have a question or have difficulties using `wifi-on-ice-portal-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/wifi-on-ice-portal-client/issues).
