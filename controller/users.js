const { response, request } = require('express');
const Usuario = require('../model/user');
const createCustomHash = require('../helpers/encrypt');


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

    const { nombre, email, password, rol } = req.body;

    const usuario = new Usuario({ nombre, email, password, rol });
    // crypt the password 
    console.log('encriptando');
    usuario.password = createCustomHash(password);
    console.log('encriptado');
    await usuario.save();

    res.json({
        msj: 'Hello World POST 5',
        usuario
    });
};

const userPut = async(req = request, res = response) => {
    const { usuarioId } = req.params;
    const { password, google, email, estado, ...resto } = req.body;

    const usuarioBD = await Usuario.findById(usuarioId);
    if (!usuarioBD) {
        res.status(400).json({ error: "ID usuario no existe" });
        return;
    }



    if (password) {
        resto.password = createCustomHash(password);
    }

    const usuario = await Usuario.findByIdAndUpdate(usuarioId, resto);


    res.json({
        msj: 'Hello World PUT 2',
        usuario
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