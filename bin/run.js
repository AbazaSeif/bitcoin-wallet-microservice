'use strict';
const config = require('../config');
const request = require('superagent');

const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);


    const announce = () => {
        request.put(`http://127.0.1:3000/service/bitcoin/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log('Erro connecting to Rogbot');
                return;
            }
            console.log(res.body);
        });
    };

server.listen();

server.on('listening', function() {
    console.log(`Bitcoin-wallet service is listening on ${server.address().port} in ${service.get('env')} mode.`);

    announce();
    setInterval(announce, 1000*15);
});