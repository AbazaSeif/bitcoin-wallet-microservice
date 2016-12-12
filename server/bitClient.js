'use strict';

var BitClient = require('bitcore-wallet-client');
var fs = require('fs');
var networkName = 'testnet';

var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var bitClient = new BitClient({
  baseUrl: BWS_INSTANCE_URL,
  verbose: true,
});
var fileName = 'rogbot-wallet.dat';
var str = fs.readFileSync(fileName, {
  encoding: 'utf8'
});

console.log(`Connecting to the ${networkName} network on the blockchain`);
console.log("Importing bot wallet");

try {
  bitClient.import(str, {}, 'Rogbot1337');
} catch (err) {
  console.log(`Could not import the wallet from ${fileName}`);
  console.log(err);
}




module.exports = bitClient;