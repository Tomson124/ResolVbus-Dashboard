var vbus = require('resol-vbus');

var _ = require('lodash');

var connection = new vbus.SerialConnection({
        path: '/dev/ttyACM0'
});

var connectPromise = connection.connect();

connectPromise.then(function() {
        console.log('Connected!');
}, function() {
        console.log('Connection failed');
});

var onPacket = function(packet) {
        console.log('Packet received: ' + packet.getId());
};
connection.on('packet', onPacket);

var spec = vbus.Specification.getDefaultSpecification();

var onPacket = function(packet) {
        console.log('Packet received: ' + packet.getId());
        var packetFields = spec.getPacketFieldsForHeaders([packet]);
        
        var data = _.map(packetFields, function(pf) {
                return {
                        id: pf.id,
                        name: pf.name,
                        rawValue: pf.rawValue,
                };
        });
        
        return JSON.stringify(data, null, 4);
};