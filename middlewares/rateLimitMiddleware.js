const { rateLimit } = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  message: {
    mensagem:
      "Muitas tentativas de login. Tente novamente mais tarde.",
  },

  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const contatoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  message: {
    mensagem:
      "Muitas mensagens enviadas. Tente novamente mais tarde.",
  },

  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  contatoLimiter,
};