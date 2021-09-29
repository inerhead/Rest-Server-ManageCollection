const Server = require('./server/server');

require('dotenv').config();


const server = new Server();

server.listen();