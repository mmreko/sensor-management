'use strict'
const status = require('http-status')

// defines the API of the service
// calls appropriate repository functions 
module.exports = (app, options) => {
	const {repo} = options
	
	// GET /sensors
	app.get('/sensors', (req, res, next) => {
		repo.getAllSensorData().then(data => {
			console.log("API: " + data[0])
			res.status(status.OK).json(data)
		}).catch(next)
	})
	
	// GET /sensors/type/:type
	app.get('/sensors/type/:type', (req, res, next) => {
		repo.getSensorDataByType(req.params.type).then(data => {
			res.status(status.OK).json(data)
		}).catch(next)
	})
	
	// GET /sensors/season/:id
	app.get('/sensors/season/:id', (req, res, next) => {
		repo.getSensorDataBySeason(req.params.id).then(data => {
			res.status(status.OK).json(data)
		}).catch(next)
	})
	
	// POST /sensors/insert
	app.post('/sensors/insert', (req, res, next) => {
		let data = req.body
		repo.insertSensorData(data).then(inserted => {
			res.status(status.OK).json(inserted)
		}).catch(next)
	})

}