# Bitalino LSL bridge to OSC

This Node.js code connects to Bitalinos OpenSignals (with *Lab Streaming Layer* enabled) to send out the incoming streams via OSC. A Cycling'74 Max patch shows how to receive the OCS data.

## Setting up

### Install Node modules
```
npm install
```

### Get OpenSignals
- Description: https://www.pluxbiosignals.com/pages/opensignals
- Manual: https://support.pluxbiosignals.com/wp-content/uploads/2021/11/OpenSignals_Manual.pdf

## Starting up
```
node bridge.js
```

