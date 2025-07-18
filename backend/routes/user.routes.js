// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth'); 

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.get('/me', userController.getMe); 
router.get('/username/:username', userController.getUserByUsername);


module.exports = router;
