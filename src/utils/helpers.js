const fs = require('fs');

const Utils = {
    getContentFiles: (opts) => {
        const { path, fileType, exclude = [] } = opts;
        const jsonContent = [];
        let filesContent = {};
        let data;

        try {
            const files = fs.readdirSync(path);
            const findedFiles = files
                .filter(file => file.includes(fileType))
                .filter(file => !exclude.includes(file));

            findedFiles.forEach(nameFile => {
                const filePath = `${path}/${nameFile}`;
                let [name] = nameFile.split('fileType');
                if (fileType === '.json'){
                    const fileContent = Utils.getJsonContent(filePath);
                    jsonContent.push(...fileContent);
                } else if(fileType === '.sql'){
                    const sqlContent = Utils.getSqlContent(filePath, name);
                    filesContent = { ...filesContent, ...sqlContent };
                } else{
                    [name] = nameFile.split('.');
                    const jsContent = Utils.getJsContent(filePath, name);
                    filesContent = Utils.setValues(filesContent, jsContent);
                }
            });
        } catch (error) {
            console.error('Error al leer los archivos', error);
        }

        if (fileType === '.json'){
            data = jsonContent;
        } else if(fileType === '.js' || fileType === '.sql'){
            data = filesContent;
        } else {
            data = null;
        }

        return data;
    },
    getPath: (path) => {
        const [root] = path.split('\\node_modules');
        return root;
    },
    getJsonContent: (filePath) => {
        const data = require(filePath);
        return data;
    },
    getSqlContent: (filePath, nameFile) => {
        const data = fs.readFileSync(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error trying to read the file', nameFile,err);
                return;
            }
            return data;
        });
        return { [nameFile]: data };
    },
    getJsContent: (filePath, nameFile) => {
        const data = require(filePath);
        return { [nameFile]: data };
    },
    setValues: (obj, value) => {
        Object.entries(value).forEach(([key, value]) => {
            if (!obj[key]) {
                obj[key] = {};
            }
            Object.keys(value).forEach(k => {
                obj[key] = {...obj[key], [k]: value[k] };
            });
        });
        return obj;
    },
};
module.exports = Utils;