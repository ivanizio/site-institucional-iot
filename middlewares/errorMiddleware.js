function tratarErros(erro, req, res, next) {
  console.error("Erro não tratado:", erro);

  return res.status(500).json({
    mensagem: "Erro interno do servidor.",
  });
}

module.exports = tratarErros;