const express = require('express');
const router = express.Router();
const isAuth = require('../util/auth')

const userController = require('../controllers/userController');

router.post('/register', userController.signUp)
router.post('/login', userController.signUp)

router.get('/', userController.userAll)
router.get('/:id', isAuth, userController.userOne)
router.put('/:id', isAuth, userController.userUpdate)
router.delete('/:id', isAuth, userController.userDelete)

module.exports = router;