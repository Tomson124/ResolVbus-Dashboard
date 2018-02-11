'use strict';



var path = require('path');



var config = {

	/**
	 * The port number for the HTTP server to listen to.
	 * @type {Number}
	 */
	httpPort: 3333,

	/**
	 * The inteval in milliseconds between two writes of the logging file.
	 * @type {Number}
	 */
	loggingInterval: 10000,

	/**
	 * The filename of the logging file.
	 * @type {String}
	 */
	loggingFilename: path.resolve(__dirname, 'live-data.json'),
};



module.exports = config;