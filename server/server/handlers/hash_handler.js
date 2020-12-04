const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash_pass(pass){
    return bcrypt.hashSync(pass, saltRounds);
}

function compare_pass(pass, hash){
    return bcrypt.compareSync(pass, hash);
} 

module.exports = {
    hash_pass,
    compare_pass
}

// console.log(hash_pass('example'))