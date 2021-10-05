const fs = require('fs');

const create = function(name) {
    return new Promise(function(resolve, reject) {
        fs.open(name, 'w', function (err, file) {
            if (err) {
                reject(`Create ${name} : KO`);
            } else {
                resolve(`Create ${name} : OK`);
            }
        });
    });
};

const read = function(name) {
    return new Promise(function(resolve, reject) {
        fs.readFile(name, 'utf8', function(err, contents) {
            if (err) {
                reject( `Read ${name} : KO`);
            } else {
                resolve(contents);
            }
        });
    });
};

const update = function(name, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(name, content, function (err) {
            if (err) {
                reject( `Update ${name} : KO`);
            } else {
                resolve(`Update ${name} : OK`);
            }
        });
    });
};

module.exports = {
    create,
    read,
    update,
    delete: function(name) {
        return new Promise(function(resolve, reject) {
            fs.unlink(name, function (err) {
                if (err) {
                    reject(`Delete ${name} : KO`);
                } else {
                    resolve(`Delete ${name} : OK`);
                }
            });
        });
    },
};
