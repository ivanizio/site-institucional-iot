function verificarAutenticacao(req, res, next) {

  if (!req.session.autenticado) {
    return res.status(401).json({
      mensagem: "Acesso não autorizado."
    });
  }

  next();
}

module.exports = verificarAutenticacao;