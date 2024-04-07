require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Router = require("./router");

class Server {
    constructor(config = {}) {
        this.app = express();
        this.port = config.port || 3000;

        const router = express.Router();
        const routerAuth = express.Router();

        Router.init(router);
        this.middlewares({...config, router});
    }
    middlewares(config) {
        const { prefix = '', router } = config;
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(prefix, router);
    };
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
};

module.exports = Server;

