'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');

var express = require('express');
var _ = require('lodash');
var Q = require('q');
var winston = require('winston');

var vbus = require('resol-vbus');

var config = require('./config');

var logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			colorize: true,
		}),
	],
});

var Promise = vbus.utils.promise;

var i18n = new vbus.I18N('en');

var spec = vbus.Specification.getDefaultSpecification();



var main = function() {
	var ctx = {
		headerSet: null,
		hsc: null,
		connection: null,
	};

	var generateJsonData = function() {
		var packetFields = spec.getPacketFieldsForHeaders(ctx.headerSet.getSortedHeaders());

		var data = _.map(packetFields, function(pf) {
			return {
				id: pf.id,
				name: pf.name,
				rawValue: pf.rawValue,
			};
		});

		return JSON.stringify(data, null, 4);
	};

	return Q.fcall(function() {
		logger.debug('Connect to VBus data source...');

		ctx.headerSet = new vbus.HeaderSet();

		ctx.hsc = new vbus.HeaderSetConsolidator({
			interval: config.loggingInterval,
		});

		ctx.connection = new vbus.SerialConnection({
            path: '/dev/ttyACM0'
        });

		ctx.connection.on('packet', function(packet) {
			ctx.headerSet.addHeader(packet);
			ctx.hsc.addHeader(packet);
		});

		ctx.hsc.on('headerSet', function(headerSet) {
			Q.fcall(function() {
				logger.debug('HeaderSet complete');

				var data = generateJsonData();

				return Q.npost(fs, 'writeFile', [ config.loggingFilename, data ]);
			}).done();
		});

		return ctx.connection.connect();
	}).then(function() {

		ctx.hsc.startTimer();

		return new Promise(function(resolve, reject) {
			// nop, just run forever
		});
	});
};



if (require.main === module) {
	Q.fcall(function() {
		return main(process.argv.slice(2));
	}).done();
} else {
	module.exports = main;
}