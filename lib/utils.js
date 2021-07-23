const crypto = require('crypto');

const config = require('./config');

//foo = 1f0c01e25707f55ed3014d60bd0d0373
exports.getHash = function(string){
    if(!string || typeof string !== 'string') return null;

    string += '_' + config.secret();

    var hash = crypto.createHash('md5').update(string).digest('hex');
    
    // console.log('Hash: ' , hash);

    return hash;
};