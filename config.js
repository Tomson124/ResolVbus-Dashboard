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
};

module.exports = config;