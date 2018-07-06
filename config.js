'use strict';

var path = require('path');

var config = {

	/**
	 * The inteval in milliseconds between two writes of the logging file.
	 * @type {Number}
	 */
    loggingInterval: 10000,

	/**
	 * Locale for Moment.js which shows time and date.
	 * @type {String}
	 */
	locale: 'de',

	/**
	 * Path to the to the connected USB-VBus Adapter
	 * @type {String}
	 */
	usbConnection: '/dev/ttyACM0',
};

module.exports = config;