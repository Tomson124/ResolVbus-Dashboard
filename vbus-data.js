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

var packetId = 0;

var Pusher = require('pusher');

var update = false;

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
    
    var dataChanged = function(packetid, nameTemp, newTemp) {
        const temp = db.get('temps')
            .find({id: packetid})
            .get('data')
            .find({name: nameTemp})
            .value();
        
        if (temp.rawValue === newTemp) {
            console.log('false');
            return false;
        }

        console.log('true');
        return true;
    }

	var generateJsonData = function() {
        var packetFields = spec.getPacketFieldsForHeaders(ctx.headerSet.getSortedHeaders());
		var packetLength = packetFields.length;
		
		moment.locale(config.locale);

		var timestamp = moment().format('LT');
		var datestamp = moment().format('L');

        db.defaults({ temps: []})
			.write();
			
		db.get('temps')
			.push({id: packetId, data:[]})
			.write()

        _.map(packetFields, function(pf) {

			if (pf.name === 'Temperature sensor 1') {
                if (dataChanged(packetId, pf.name, pf.rawValue)) {
                    db.get('temps')
                        .find({id: packetId})
                        .get('data')
                        .push({id: pf.id, time: timestamp, date: datestamp, name: pf.name, rawValue: pf.rawValue})
                        .write()
                        console.log('id' + pf.id)
                }
            }
            if (pf.name === 'Temperature sensor 2') {
                if (dataChanged(packetId, pf.name, pf.rawValue)) {
                    db.get('temps')
                        .find({id: packetId})
                        .get('data')
                        .push({id: pf.id, time: timestamp, date: datestamp, name: pf.name, rawValue: pf.rawValue})
                        .write()
                        console.log('id' + pf.id)
                }
			}		
		});

		packetId++;
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

				var data = generateJsonData();

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