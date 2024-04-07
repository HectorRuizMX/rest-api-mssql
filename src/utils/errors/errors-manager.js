const ErrorCodes = require('./error-codes.json');

const ErrorsManager = {
    printError: (error,data) => {
        if(typeof error === 'string'){
            console.error(error);
        } else {
            const { code, msg } = error;
            console.error({ code, msg, data });
        }
    },
    getErrorData: (opts) => {
        const { model, property, expected } = opts;

        const modelsCodes = ErrorCodes?.[model]?.model || [];
        const error = modelsCodes.find(c => c.property === property && c.expected === expected);

        return error;
    },
    processModelError: (errors, model) => {
        if(errors.length === 0) return true;

        errors.forEach(err => {
            const { property, expected, data } = err;
            const error = ErrorsManager.getErrorData({ model, property, expected });
            if(error){
                ErrorsManager.printError(error, data);
            } else {
                ErrorsManager.printError('Unknown error');
            }
        });
        return false;
    },
};
module.exports = ErrorsManager;