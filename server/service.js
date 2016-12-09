'use strict';

const express = require('express');
const service = express();
const config = require('../config');
const request = require('superagent')
const moment = require('moment');

service.put('/service', (req, res, next) => {

 /*
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${config.geoCodingGoogleKey}`, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //res.json(response.body.results[0].geometry.location);
        const location = response.body.results[0].geometry.location;

*/
    console.log(res);



});

module.exports = service;