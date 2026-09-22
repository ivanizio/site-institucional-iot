const express = require("express");

const router = express.Router();

const { contatoLimiter } = require("../middlewares/rateLimitMiddleware");

const contatoController = require("../controllers/contatoController");

const verificarAutenticacao = require("../middlewares/authMiddleware");

const validarId = require("../middlewares/validarIdMiddleware");

router.post("/", contatoLimiter, contatoController.enviarContato);

router.get("/", verificarAutenticacao, contatoController.listarContatos);

router.get(
  "/:id",
  verificarAutenticacao,
  validarId,
  contatoController.buscarContatoPorId,
);

router.delete(
  "/:id",
  verificarAutenticacao,
  validarId,
  contatoController.excluirContato,
);

router.put(
  "/:id",
  verificarAutenticacao,
  validarId,
  contatoController.atualizarContato,
);

module.exports = router;
