const Osc = require('node-osc');

const oscHost = '0.0.0.0';
const oscPort = 3000;
const oscClient = new Osc.Client(oscHost, oscPort);

const net = require('net');

const host = 'localhost';
const port = 5555;

let socket = new net.Socket();

socket.connect(port, host, () => {
  console.log(`socket is connected to ${host}:${port}`);
  socket.write('start\r\n');
});

function terminate() {
  socket.destroy();
  socket = null;
}

socket.on('data', (data) => {
  const str = data.toString();
  const obj = JSON.parse(str);

  if (obj.returnCode === 0) {
    const deviceData = Object.values(obj.returnData)[0];

    if (Array.isArray(deviceData)) {
      const length = deviceData.length;
      let sum = 0.

      for (let i = 0; i < length; i++) {
        const frame = deviceData[i];
        // const index = frame[0]
        // const value = frame[5];
        sum += frame[5];
      }

      const value = sum / length;
      oscClient.send('/bitalino', value, onOscError);
    } else {
      console.log('reading device: ',  Object.keys(obj.returnData)[0]);
      console.log(deviceData);
    }
  }
});

socket.on('close', function () {
  console.log('connection closed');
});

function onOscError(error) {
  if (error) {
    console.error(`${error} (sending to ${target})`);
  }
}
