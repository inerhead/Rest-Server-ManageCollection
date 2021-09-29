const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../model/user');
const { validationResult } = require('express-validator');

const usersGet = (req = request, res = response) => {

    const { id, name, page = 1 } = req.query;

    res.json({
        VideoJuego: 'Contra',
        id,
        name,
        page
    });
};

const usersPost = async(req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { nombre, email, password, rol } = req.body;

    // verificar si el correo existe
    const existeemail = await Usuario.findOne({ email });
    const usuario = new Usuario({ nombre, email, password, rol });
    if (existeemail) {
        return res.status(400).json({ msg: "El correo ya esta registrado" });
    }
    // crypt the password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();


    res.json({
        msj: 'Hello World POST 5',
        usuario
    });
};

const userPut = (req = request, res = response) => {
    const { usuarioId } = req.params;
    const body = req.body;
    res.json({
        msj: 'Hello World PUT 2',
        body: usuarioId
    });
};
const usersPutError = (req, res = response) => {

    const dirArray = __dirname.split("\\");
    const dirRoot = dirArray.splice(0, dirArray.length - 1).join('\\');
    res.sendFile(`${dirRoot}/public/error.html`);
    //res.send('Nada que ver ' + dirRoot);
};

const usersDelete = (req, res = response) => {
    res.send('Hello World DELETE 123');
};




module.exports = {
    usersGet,
    usersPost,
    usersDelete,
    userPut,
    usersPutError
};