const { Schema, model } = require('mongoose');

const schemaRole = Schema({
    rol: {
        type: String,
        require: [true, "El rol "]
    }
});



module.exports = model('rol', schemaRole);
