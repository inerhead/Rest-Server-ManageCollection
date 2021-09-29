const { Router } = require('express');
const { check } = require('express-validator');
const { usersDelete, usersPost, usersGet, userPut, usersPutError } = require('../controller/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [check('email', "El correo no es Valido!!!").isEmail()], usersPost);

router.put('/:usuarioId', userPut);
router.delete('/', usersDelete);
router.put('*', usersPutError);


module.exports = router;