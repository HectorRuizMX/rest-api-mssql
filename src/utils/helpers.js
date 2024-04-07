const Validations = require('./validations');
const fs = require('fs');

const Utils = {
    getContentFiles: (opts) => {
        const { path, fileType, exclude = [] } = opts;
        const arrFiles = [];
        let jsContent = {};
        let data;

        try {
            const files = fs.readdirSync(path);
            const findedFiles = files
                .filter(file => file.includes(fileType))
                .filter(file => !exclude.includes(file));

            findedFiles.forEach(name => {
                const fileContent = require(`${path}/${name}`);
                if (fileType === '.json'){
                    arrFiles.push(...fileContent);
                } else {
                    jsContent = { ...jsContent, ...fileContent };
                }
            });
        } catch (error) {
            console.error('Error al leer los archivos');
        }

        if (fileType === '.json'){
            data = arrFiles;
        } else if(fileType === '.js'){
            data = jsContent;
        } else {
            data = null;
        }

        return data;
    },
};
module.exports = Utils;