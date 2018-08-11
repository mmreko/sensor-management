// configuration file for the app

// database parameters
const dbSettings = {
	db: 'sensors',
	user: 'root',
	pass: 'rootPassXXX',
	//server: '192.168.99.100:27018',
	server: 'http://mongo-sensor:27017',
	dbParameters: () => ({
		w: 'majority',
		wtimeout: 10000,
		j: true,
		readPreference: 'ReadPreference.SECONDARY_PREFERRED',
		native_parser: false
	}),
	serverParameters: () => ({
		autoReconnect: true,
		poolSize: 10,
		socketoptions: {
			keepAlive: 300,
			connectTimeoutMS: 30000,
			socketTimeoutMS: 30000
		}
	}),
}

// server parameters
const serverSettings = {
	port: 5001
}

module.exports = Object.assign({}, { dbSettings, serverSettings })