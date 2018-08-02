'use strict'
const ObjectID = require('mongodb').ObjectID;

// holds an open connection to the db
// exposes some functions for accessing the data using mongoDB syntax
const repository = (mongoclient) => {
	
	const db = mongoclient.db('sensors')
	
	const currentSeason = () => {
		return "S2018DE"
	}
	
	// fetches all sensor data 
	const getAllSensorData = () => {
		return new Promise((resolve, reject) => {
			const sensorData = []
			const cursor = db.collection('sensorData').find();
			
			const addData = (data) => {
				sensorData.push(data)
			}
			
			const sendData = (err) => {
				if (err) {
					reject(new Error('An error occured fetching sensor data, err:' + err))
				}
				resolve(sensorData)
			}
			
			cursor.forEach(addData, sendData)
		})
	}
	
	// fetches sensor data by type
	const getSensorDataByType = (type) => {
		return new Promise((resolve, reject) => {
			const sensorData = []
			const cursor = db.collection('sensorData').find({type: type});
			
			const addData = (data) => {
				sensorData.push(data)
			}
			
			const sendData = (err) => {
				if (err) {
					reject(new Error('An error occured fetching sensor data, err:' + err))
				}
				resolve(sensorData)
			}
			
			cursor.forEach(addData, sendData)
		})
	}
	
	// fetches sensor data by season
	const getSensorDataBySeason = (seasonId) => {
		return new Promise((resolve, reject) => {
			const sensorData = []
			const cursor = db.collection('sensorData').find({seasonId: seasonId});
			
			const addData = (data) => {
				sensorData.push(data)
			}
			
			const sendData = (err) => {
				if (err) {
					reject(new Error('An error occured fetching sensor data, err:' + err))
				}
				resolve(sensorData)
			}
			
			cursor.forEach(addData, sendData)
		})
	}
	
	// inserts new sensor data
	const insertSensorData = (data) => {
		return new Promise((resolve, reject) => {
			const payload = {
				idMember: data.idMember,
				clientVersion: data.clientVersion,
				device: data.device,
				type: data.type,
				data: data.data,
				dateCollected: new Date(),
				seasonId: currentSeason()
			}
			
			const sendData = (err, result) => {
				if (err) {
					reject(new Error(`An error occured inserting sensor data, err: ${err}`))
				}
				resolve(result)
			}
			
			db.collection('sensorData').insertOne(payload, sendData);
		})
	}
	
	// disconnects from the db
	const disconnect = () => {
		mongoclient.close();
	}
	
	// exports the repository 
	return Object.create({
		getAllSensorData,
		getSensorDataByType,
		getSensorDataBySeason,
		insertSensorData,
		disconnect
	})
			
}

// connects to the db 
const connect = (connection) => {
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject(new Error('Connection to db not supplied!'))
		}
		resolve(repository(connection))
	})
}

module.exports = Object.assign({}, {connect})