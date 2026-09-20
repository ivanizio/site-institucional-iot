const express = require("express");

const { loginLimiter } = require("../middlewares/rateLimitMiddleware");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/login",loginLimiter,authController.login);

router.get("/sessao", authController.verificarSessao);

router.post("/logout", authController.logout);

module.exports = router;
