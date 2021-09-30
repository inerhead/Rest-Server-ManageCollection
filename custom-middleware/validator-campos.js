const { validationResult } = require('express-validator');
const Rol = require('../model/rol');

const validarCampos = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

const validarRol = async (rol = '') => {
    const existe = await Rol.findOne({rol});
    if (!existe) {
        throw new Error('No existe rol: ' + rol);
    }
};

module.exports = {
    validarCampos,
    validarRol
};