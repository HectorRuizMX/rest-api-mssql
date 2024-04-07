const Utils = require('../utils/helpers');

const Handlers = {
    getAllHandlers: () => {
        const config = {
            path: __dirname,
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

        if(!currentHandler || typeof currentHandler !== 'function') console.error(`Handler ${handlerName} not found`);
        return currentHandler;
    }
};
module.exports = Handlers;