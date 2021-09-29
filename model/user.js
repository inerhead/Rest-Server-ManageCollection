const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerido']
    },
    rol: {
        type: String,
        required: [true, 'el correo es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']

    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});


module.exports = model('Usuario', UsuarioSchema);