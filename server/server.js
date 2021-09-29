const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();

        // Connect to the BD
        this.connectDB();
        // Midlewares
        this.middleware();

        // Routes
        this.routes();

    }

    async connectDB() {

        await dbConnection();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use(express.static('./public'));
    }

    routes() {

        this.app.use('/api/users', require('../routes/user'));

    }

    listen() {

        this.app.listen(this.port, () => console.log(`escuchando en ${this.port}`));
    }


}

module.exports = Server;