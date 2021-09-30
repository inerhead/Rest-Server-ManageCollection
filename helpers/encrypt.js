//import bcryptjs from "bcryptjs";
const bcryptjs = require('bcryptjs');


const createCustomHash = (word) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(word, salt);
};

module.exports = createCustomHash;