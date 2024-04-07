const Utils = require('../utils/helpers');

const Handlers = {
    getAllHandlers: () => {
        const env = process.env.NODE_ENV || 'PROD';
        const config = {
            path: env === 'DEV' ? __dirname : `${Utils.getPath(__dirname)}\\src\\handlers`,
            fileType: '.js',
            exclude: ['index.js']
        };
        const handlers = Utils.getContentFiles(config);
        return handlers;
    },
    getHandler: (handlerName) => {
        let handlers = Handlers.getAllHandlers();
        let currentHandler;

        const nameParts = handlerName.split('.');
        nameParts.forEach(part => {
            handlers = handlers?.[part];
            if(!handlers) return;
            currentHandler = handlers;
        });

        if(!currentHandler) console.error(`Handler ${handlerName} not found`);
        if(typeof currentHandler === 'object') console.error(`Handler ${handlerName} is not a function`);

        return currentHandler;
    },
};
module.exports = Handlers;