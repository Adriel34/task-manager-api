const { Router } = require('express');
const verifyToken = require('../../midlewares/auth-midleware');
const UserController = require('./user.controller');
const router = Router();

    router.route('/user/create')
    .post(UserController.createUser);

    router.route('/user')
    .get(verifyToken, UserController.getUserById)

    router.route('/user/login')
    .post(UserController.login);

    router.route('/user/update')
    .post(UserController.updateUser);




module.exports = router;
