'use strict';

var BitClient = require('bitcore-wallet-client');
var fs = require('fs');
var config = require('../config');

var networkName = 'testnet';

var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var bitClient = new BitClient({
  baseUrl: BWS_INSTANCE_URL,
  verbose: true,
});
var fileName = config.walletFile;
var str = fs.readFileSync(fileName, {
  encoding: 'utf8'
});

console.log(`Connecting to the ${networkName} network on the blockchain`);
console.log("Importing bot wallet");

try {
  bitClient.import(str, {}, config.walletPassword);
} catch (err) {
  console.log(`Could not import the wallet from ${fileName}`);
  console.log(err);
}




module.exports = bitClient;