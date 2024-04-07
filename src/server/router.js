const Validations = require('../utils/validations');
const Handlers = require('../handlers');
const RouterUtils = require('../routes/utils');
const Utils = require('../utils/helpers');
const { version } = require('../../package.json');
const path = require('node:path');

const Router = {
    init: (router) => {
        //Welcome route must be the first route
        Router.welcome(router);

        //Router must be added here
        Router.createRoutes(router);
        RouterUtils.init(router);

        //notFound must be the last route
        Router.notFound(router);
    },
    welcome: (router) => {
        router.get('/', (_req, res) => {
            res.status(200).send({
                code: 200,
                msg: 'Agenda Smart API',
                version,
            });
        });
    },
    notFound: (router) => {
        router.get('*', (_req, res) => {
            res.status(404).sendFile('404.html', { root: __dirname + '/../../public' });
        });
    },
    registerRoutes: (router, routes) => {
        if(Validations.isNotEmptyArray(routes)){
            routes.forEach(route => {
                if(Validations.validateRoute(route)){
                    const { method = '', path = [], handler = '' } = route;
                    const currentHandler = Handlers.getHandler(handler);
                    if(!currentHandler) return;
                    path.forEach(p => {
                        router[method.toLowerCase()](p, currentHandler);
                    });
                }
            });
        }
    },
    createRoutes: (router) => {
        const srcPath = path.dirname(__dirname);
        const routes = Utils.getContentFiles({ path: `${srcPath}/routes`, fileType: '.json' });
        Router.registerRoutes(router, routes);
    },
};

module.exports = Router;