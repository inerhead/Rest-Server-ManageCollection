const { response, request } = require('express');
const Usuario = require('../model/user');
const createCustomHash = require('../helpers/encrypt');


const usersGet = async(req = request, res = response) => {

    const { from = 0, limit = 3 } = req.query;



    const [usuarios, count] = await Promise.all([Usuario
        .find({ estado: true })
        .skip(Number(from))
        .limit(Number(limit)),
        Usuario.countDocuments({ estado: true })
    ]);

    /* const usuarios = await Usuario
         .find({ estado: true })
         .skip(Number(from))
         .limit(Number(limit));

     const count = await Usuario.countDocuments({ estado: true });*/
    /* res.json({
         VideoJuego: 'Contra',
         id,
         name,
         page
     });*/

    res.json({
        count,
        usuarios,
    });
};

const usersGetById = async(req = request, res = response) => {

    const { id } = req.params;

    const { password, nombre, rol, email, estado } = await Usuario.findById(id);

    res.json({
        usuario: {
            nombre,
            rol,
            email,
            estado,
            password
        },
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

const usersDelete = async(req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const { nombre } = usuario;


    res.json({
        nombre
    });
};




module.exports = {
    usersGet,
    usersGetById,
    usersPost,
    usersDelete,
    userPut,
    usersPutError
};