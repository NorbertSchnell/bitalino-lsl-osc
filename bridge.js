const lsl = require('lsl.js');
const Osc = require('node-osc');

const oscHost = '0.0.0.0';
const oscPort = 3000;
const oscClient = new Osc.Client(oscHost, oscPort);

const lslStreams = lsl.resolve_byprop('name', 'OpenSignals');

if (lslStreams.length > 0) {
  const streamInlet = new lsl.StreamInlet(lslStreams[0]);
  streamInlet.streamChunks(2, 1000);
  streamInlet.on('chunk', onLsLChunk);
  streamInlet.on('closed', () => console.log('LSL inlet closed'));
} else {
  console.error('did not find any LSL stream');
}

function onLsLChunk(chunk) {
  const data = chunk.data;

  for (let i = 0; i < data[0].length; i++) {
    const frame = [];
    
    for (let j = 0; j < data.length; j++) {
      frame.push(data[j][i]);
    }

    oscClient.send('/bitalino', frame, onOscError);
  }
}

function onOscError(error) {
  if (error) {
    console.error(`${error} (sending to ${target})`);
  }
}
