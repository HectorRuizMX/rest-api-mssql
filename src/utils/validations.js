const ErrorsManager = require('./errors/errors-manager');
const Models = require('../models/');

const Validations = {
    isNotEmptyArray: (arr) => {
        return Array.isArray(arr) && arr.length > 0;
    },
    isString: (str) => {
        return typeof str === 'string';
    },
    validateRoute: (route) => {
        const RouteModel = Models.Route;
        const Errors = Validations.validateModel(RouteModel, route);

        return ErrorsManager.processModelError(Errors, 'route');
    },
    validateModel: (model, data) => {
        const errors = [];

        Object.entries(model).forEach(([property, type]) => {
            const [modelType, required] = type.split('?');
            if (!data[property] || modelType !== type) {
                if(typeof required !== 'undefined') return;
                errors.push({ data, property, expected: !data[property] ? 'exist' : 'type' });
            }
        });
        return errors;
    },
};
module.exports = Validations;