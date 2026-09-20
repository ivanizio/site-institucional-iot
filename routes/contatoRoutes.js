const express = require("express");

const router = express.Router();

const { contatoLimiter } = require("../middlewares/rateLimitMiddleware");

const contatoController = require("../controllers/contatoController");

const verificarAutenticacao = require("../middlewares/authMiddleware");

router.post("/", contatoLimiter, contatoController.enviarContato);

router.get("/", verificarAutenticacao, contatoController.listarContatos);

router.get("/:id", verificarAutenticacao, contatoController.buscarContatoPorId);

router.delete("/:id", verificarAutenticacao, contatoController.excluirContato);

module.exports = router;

router.put("/:id", verificarAutenticacao, contatoController.atualizarContato);
