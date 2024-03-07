const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/discord-login', authController.discordLogin);

module.exports = router;
