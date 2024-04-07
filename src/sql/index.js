const Utils = require('../utils/helpers');
const SqlHandler = {
    getAllSQLHandlers: () => {
        const env = process.env.NODE_ENV || 'PROD';
        const config = {
            path: env === 'DEV' ? __dirname : `${Utils.getPath(__dirname)}\\src\\sql`,
            fileType: '.sql',
        };
        const handlers = Utils.getContentFiles(config);
        return handlers;
    },
    getSQL: (sql) => {
        const sqlFiles = SqlHandler.getAllSQLHandlers();
        const currentHandler = sqlFiles[sql];
        if(!currentHandler) console.error(`SQL ${sql} not found`);
        return currentHandler;
    },
    runSQLQuery: async (req, res, sql) => {
        res.status(200).send(
            {
                code: 200,
                msg: 'SQL Query',
                content: sql,
            }
        );
    },
};
module.exports = SqlHandler;