const dbPostgres = require("../database/postgres");

async function enviarContato(req, res) {
  const dados = req.body;

  if (!dados.nome?.trim() || !dados.email?.trim() || !dados.mensagem?.trim()) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios.",
    });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(dados.email)) {
    return res.status(400).json({
      mensagem: "Informe um e-mail válido.",
    });
  }

  const resultado = await dbPostgres.query(
    `INSERT INTO contatos (nome, email, mensagem)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [dados.nome, dados.email, dados.mensagem],
  );

  console.log("Contato salvo com ID:", resultado.rows[0].id);

  res.json({
    mensagem: "Mensagem enviada com sucesso!",
  });
}

async function listarContatos(req, res) {
  const resultado = await dbPostgres.query(
    "SELECT * FROM contatos ORDER BY id DESC",
  );

  res.json(resultado.rows);
}

async function buscarContatoPorId(req, res) {
  const id = req.params.id;

  const resultado = await dbPostgres.query(
    `SELECT * FROM contatos
     WHERE id = $1`,
    [id],
  );

  const contato = resultado.rows[0];

  if (!contato) {
    return res.status(404).json({
      mensagem: "Contato não encontrado.",
    });
  }

  res.json(contato);
}

async function excluirContato(req, res) {
  const id = req.params.id;

  const resultado = await dbPostgres.query(
    `DELETE FROM contatos
     WHERE id = $1`,
    [id],
  );

  if (resultado.rowCount === 0) {
    return res.status(404).json({
      mensagem: "Contato não encontrado.",
    });
  }

  res.json({
    mensagem: "Contato excluído com sucesso.",
  });
}

async function atualizarContato(req, res) {
  const id = req.params.id;
  const dados = req.body;

  if (!dados.nome?.trim() || !dados.email?.trim() || !dados.mensagem?.trim()) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios.",
    });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(dados.email)) {
    return res.status(400).json({
      mensagem: "Informe um e-mail válido.",
    });
  }

  const resultado = await dbPostgres.query(
    `UPDATE contatos
     SET nome = $1, email = $2, mensagem = $3
     WHERE id = $4
     RETURNING *`,
    [dados.nome.trim(), dados.email.trim(), dados.mensagem.trim(), id],
  );

  if (resultado.rowCount === 0) {
    return res.status(404).json({
      mensagem: "Contato não encontrado.",
    });
  }

  res.json({
    mensagem: "Contato atualizado com sucesso.",
  });
}

module.exports = {
  enviarContato,
  listarContatos,
  buscarContatoPorId,
  excluirContato,
  atualizarContato,
};
