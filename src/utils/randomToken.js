const crypto = require('crypto');

const token = () => crypto.randomBytes(8).toString('hex');

console.log(token());

module.exports = token;