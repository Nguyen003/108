const net = require('net');

const EVENT = {
  TURN_ON: '#10010001',
  TURN_OFF: '10',
};

const RESPONSE = {
  ON: '#10010001',
  OFF: '10',
};

let valueOfLight = RESPONSE.OFF;

const client = new net.Socket();
client.connect(100, function () {
  client.write(valueOfLight);
  console.log('Connected');
});

client.on('data', function (data) {
  const parseData = data.toString();

  if (parseData === EVENT.TURN_ON) {
    valueOfLight = switchLight(EVENT.TURN_ON);
    return client.write(valueOfLight);
  }

  if (parseData === EVENT.TURN_OFF) {
    valueOfLight = switchLight(EVENT.TURN_OFF);
    return client.write(valueOfLight);
  }
});

client.on('close', function () {
  console.log('Connection closed');
});

function switchLight(valueInput) {
  if (valueInput === EVENT.TURN_ON) {
    return RESPONSE.ON;
  }

  if (valueInput === EVENT.TURN_OFF) {
    return RESPONSE.OFF;
  }
 
}
