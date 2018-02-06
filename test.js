var vbus = require('resol-vbus');

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
        var packetFields = spec.getPacketFieldsForHeaders([ packet
]);
        console.log(packetFields);
};
