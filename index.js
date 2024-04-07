const Server = require('./src/server');

const BuildServer = (config) => {
    const server = new Server(config);
    server.listen();
};

module.exports = { BuildServer };