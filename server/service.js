'use strict';

const express = require('express');
const service = express();
const config = require('../config');
const request = require('superagent')
const bitClient = require('./bitClient');
var bodyParser = require('body-parser');
var feePerKb = 100e2;
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({
    extended: true
}));


service.post('/service/transfer', (req, res, next) => {

    console.log("Received params: ");
    console.log(req.body);
    var params = req.body;

    if (!params.amount || !params.destination) {
        res.json({ message: "To make a transfer you must provide a valid destination and amount" });
        return;
    }

    console.log("Making a transfer: ");
    console.log(params);

    bitClient.createTxProposal({
        outputs: [{
            toAddress: params.destination,
            amount: params.amount * 100000000,
        }],
        message: `automatic transfer made by the bot`,
        type: 'external',
        feePerKb: feePerKb
    },
        function (err, txp) {
            if (err) {
                console.log(err);
                res.json({ message: "I got an error when creating the transfer. Sorry!" });
                return;
            }

            bitClient.publishTxProposal({ txp: txp }, function (err, txp) {
                if (err) {
                    console.log(err);
                    res.json({ message: "I got an error when publishing the transfer. Sorry!" });
                    return;
                }
                bitClient.signTxProposal(txp, function (err, txp) {
                    if (err) {
                        console.log(err);
                        res.json({ message: "I got an error when signing the transfer. Sorry!" });
                        return;
                    }

                    bitClient.broadcastTxProposal(txp, function (err, txp, memo) {
                        if (err) {
                            console.log(err);
                            res.json({ message: "I got an error when broadcasting the transfer. Sorry!" });
                            return;
                        }
                        if (memo) {
                            console.log(memo);
                        };

                        console.log(' * Tx created: ID %s [%s] ', txp.id, txp.status);
                        res.json({ message: `I transfered ${params.amount} BTC to ${params.destination}` });

                    });

                });

            });
        });
});

service.post('/service/balance', (req, response, next) => {

    console.log('Getting balance');
    bitClient.getBalance({}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res);
        var results = { message: `I have ${(res.totalAmount / 100000000).toFixed(6)} BTC in my balance, ${(res.lockedAmount / 100000000).toFixed(6)} BTC locked` };
        response.json(results);
    });

});

module.exports = service;