const { validationResult } = require('express-validator');
const Rol = require('../model/rol');
const Usuario = require('../model/user');

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

const validarRol = async(rol = '') => {
    const existe = await Rol.findOne({ rol });
    if (!existe) {
        throw new Error('No existe rol: ' + rol);
    }
};

const existeEmail = async(email) => {
    const existeemail = await Usuario.findOne({ email });
    if (existeemail) {
        throw new Error("El correo ya esta registrado: " + email);
        //return res.status(400).json({ msg: "El correo ya esta registrado" });
    }
};

const existeIdUsuario = async(usuarioId) => {
    const usuarioBD = await Usuario.findById(usuarioId);
    if (!usuarioBD) {
        throw new Error("ID usuario no existe: " + usuarioId);
        //res.status(400).json({ error: "ID usuario no existe" });        
    }
};

module.exports = {
    validarCampos,
    validarRol,
    existeEmail,
    existeIdUsuario
};