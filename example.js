'use strict'

const portal = require('.')

portal.status()
// portal.journey()
.then(console.log)
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
