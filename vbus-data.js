var vbus = require('resol-vbus');
var moment = require('moment');

var fs = require('fs');
var _ = require('lodash');
var Q = require('q');

var config = require('./config');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/solar.json');
const db = low(adapter);

var spec = vbus.Specification.getDefaultSpecification();

var packetId = 1;

var Pusher = require('pusher');

var update = false;
var dataChange = false;

var pusher = new Pusher({
  appId: '556448',
  key: '8a6d04a328c3b05e85f2',
  secret: '555de261aa12f36db936',
  cluster: 'eu',
  encrypted: true
});

var main = function() {
	var ctx = {
		headerSet: null,
		hsc: null,
		connection: null,
    };
    
    var dataChanged = function() {
		var packetFields = spec.getPacketFieldsForHeaders(ctx.headerSet.getSortedHeaders());
		var changed1 = false;
		var changed2 = false;

		_.forEach(packetFields, function(pf) {
			if (pf.name === 'Temperature sensor 1') {
				const temp1 = db.get('temps')
					.find({id: packetId - 1})
					.get('data')
					.find({name: pf.name})
					.value();
				if (temp1.rawValue !== pf.rawValue) {
					changed1 = true;
				}
				else {
					changed1 = false;
				}
			}
			if (pf.name === 'Temperature sensor 2') {
				const temp2 = db.get('temps')
					.find({id: packetId - 1})
					.get('data')
					.find({name: pf.name})
					.value();
				if (temp2.rawValue !== pf.rawValue) {
					changed2 = true;
				}
				else {
					changed2 = false;
				}
			}
		});

		if (changed1 || changed2) {
			return update = true;
		}
		else {
			return update = false;
		}
	}

	var latestId = function() {
		var packet = db.get('temps')
			.latest()
			.value();
		return packet.id;
	}
	
	db._.mixin({
		latest: function(array) {
		  var long = array.length;
		  return array[long - 1];
		}
	});

	var pushTrigger = function() {
		db.read();
		const temp2 = db.get('temps')
			.latest()
			.get('data')
			.find({name: 'Temperature sensor 2'})
			.value()
		const temp1 = db.get('temps')
			.latest()
			.get('data')
			.find({name: 'Temperature sensor 1'})
			.value()
		const time = db.get('temps')
			.latest()
			.get('time')
			.value()
		const date = db.get('temps')
			.latest()
			.get('date')
			.value()
		const test = [temp1, temp2, time, date]

		pusher.trigger('vbus-channel', 'data-update-event', {
			"message": test
		});
	}

	var generateJsonData = function() {
        var packetFields = spec.getPacketFieldsForHeaders(ctx.headerSet.getSortedHeaders());
		var packetLength = packetFields.length;
		
		moment.locale(config.locale);

		var timestamp = moment().format('LT');
		var datestamp = moment().format('L');

        db.defaults({ temps: []})
			.write();

        _.forEach(packetFields, function(pf) {
			if (pf.name === 'Temperature sensor 1' || pf.name === 'Temperature sensor 2') {
                if (update) {
					if (latestId() !== packetId) {
						db.get('temps')
							.push({id: packetId, time: timestamp, date: datestamp, data:[]})
							.write();
					}

					db.get('temps')
						.find({id: packetId})
						.assign({time: timestamp, date: datestamp})
						.write();

                    db.get('temps')
                        .find({id: packetId})
                        .get('data')
                        .push({id: pf.id, name: pf.name, rawValue: pf.rawValue})
                        .write();
					dataChange = true;
						
				}
            }
		});
		if (dataChange) {
			packetId++;
			pushTrigger();
			dataChange = false;
		}		
	};

	return Q.fcall(function() {
		console.log('Connect to VBus data source...');

		ctx.headerSet = new vbus.HeaderSet();

		ctx.hsc = new vbus.HeaderSetConsolidator({
			interval: config.loggingInterval,
		});

		ctx.connection = new vbus.SerialConnection({
            path: config.usbConnection,
        });

		ctx.connection.on('packet', function(packet) {
			ctx.headerSet.addHeader(packet);
			ctx.hsc.addHeader(packet);
		});

		ctx.hsc.on('headerSet', function(headerSet) {
			Q.fcall(function() {
				console.log('HeaderSet complete');
				dataChanged();
				generateJsonData();

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
