var fs = require('fs');

const create = function(name) {
    fs.open(name, 'w', function (err, file) {
        if (err){
            console.log(`Create ${name} : KO`)
        } else{
            console.log(`Create ${name} : OK`)
        }
    });
};

const read = function(name) {
    fs.readFile(name, 'utf8', function(err, contents) {
        if (err){
            console.log(`Read ${name} : KO`)
        } else {
            console.log(contents);
        }
    });
};

const update = function(name, content) {
    fs.writeFile(name, content, function (err) {
        if (err){
            console.log(`Update ${name} : KO`)
        } else{
            console.log(`Update ${name} : OK`)
        }
    });
};

module.exports = {
    create,
    read,
    update,
    delete: function(name) {
        fs.unlink(name, function (err) {
            if (err){
                console.log(`Delete ${name} : KO`)
            } else{
                console.log(`Delete ${name} : OK`)
            }
        });
    },
};
