const bcrypt = require("bcrypt");

const usuarioAdmin = process.env.ADMIN_USER;

const hashSenhaAdmin = process.env.ADMIN_PASSWORD_HASH;

async function login(req, res) {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({
      mensagem: "Usuário e senha são obrigatórios.",
    });
  }

  if (usuario !== usuarioAdmin) {
    return res.status(401).json({
      mensagem: "Usuário ou senha inválidos.",
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, hashSenhaAdmin);

  if (!senhaCorreta) {
    return res.status(401).json({
      mensagem: "Usuário ou senha inválidos.",
    });
  }

  req.session.autenticado = true;
  req.session.usuario = usuario;

  res.json({
    mensagem: "Login válido.",
  });
}

function verificarSessao(req, res) {

  res.json({
    autenticado: req.session.autenticado || false,
    usuario: req.session.usuario || null
  });

}

function logout(req, res) {

  req.session.destroy((erro) => {

    if (erro) {
      return res.status(500).json({
        mensagem: "Erro ao encerrar sessão."
      });
    }

    res.clearCookie("connect.sid");

    res.json({
      mensagem: "Logout realizado com sucesso."
    });

  });

}

module.exports = {
  login,
  verificarSessao,
  logout
};
