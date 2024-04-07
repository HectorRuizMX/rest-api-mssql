const path = require('path');

const { version, name } = require('../../package.json');
const Validations = require('../utils/validations');
const Handlers = require('../handlers');
const SqlHandlers = require('../sql');
const Utils = require('../utils/helpers');

const Router = {
    init: (router) => {
        //Welcome route must be the first route
        Router.welcome(router);

        //Router must be added here
        Router.createRoutes(router);

        //notFound must be the last route
        Router.notFound(router);
    },
    welcome: (router) => {
        router.get('/', (_req, res) => {
            res.status(200).send({
                code: 200,
                msg: `${name} API`,
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
                    const { method = '', path = [], handler = '', sql = [] } = route;
                    let currentHandler = sql.length > 0 ? SqlHandlers.getSQL(sql) : Handlers.getHandler(handler);

                    if(typeof currentHandler !== 'function' && sql.length === 0) return console.error(`This route ${JSON.stringify(route)} has no valid function handler`);
                    if(typeof currentHandler !== 'string' && sql.length > 0) return console.error(`This route ${JSON.stringify(route)} has no valid sql handler`);
                    if(!currentHandler) return console.error(`Handler ${handler} not found to this route ${JSON.stringify(route)}`);

                    const sqlQuery = currentHandler;
                    if(sql.length > 0) {
                        currentHandler = (req, res) => SqlHandlers.runSQLQuery(req, res, sqlQuery);
                    }
                    path.forEach(p => {
                        router[method.toLowerCase()](p, currentHandler);
                    });
                }
            });
        }
    },
    createRoutes: (router) => {
        const env = process.env.NODE_ENV || 'PROD';
        const srcPath = env === 'DEV' ? `${path.dirname(__dirname)}\\routes` : `${Utils.getPath(__dirname)}\\src\\routes`;
        const routes = Utils.getContentFiles({ path: srcPath, fileType: '.json' });
        Router.registerRoutes(router, routes);
    },
};

module.exports = Router;