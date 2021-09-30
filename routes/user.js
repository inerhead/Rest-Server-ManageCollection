const { Router } = require('express');
const { check } = require('express-validator');
const { usersDelete, usersPost, usersGet, userPut, usersPutError } = require('../controller/users');
const { validarCampos, validarRol, existeEmail, existeIdUsuario } = require('../custom-middleware/validator-campos');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('nombre', "El nombre es Obligatorio !!!").notEmpty(),
    check('email', "El correo no es Valido!!!").isEmail(),
    check('password', "El password es Obligatorio!!!").notEmpty(),
    check('rol').custom(validarRol),
    check('email').custom(existeEmail),
    //check('rol', "El rol es Obligatorio !!!").notEmpty(),
    validarCampos
], usersPost);

router.put('/:usuarioId', [
    check('usuarioId', "No es un ID mongo Adecuado").isMongoId(),
    check('usuarioId').custom(existeIdUsuario),
    validarCampos
], userPut);
router.delete('/', usersDelete);
router.put('*', usersPutError);


module.exports = router;