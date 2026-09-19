const db = require("../database/database");

function enviarContato(req, res) {
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

  const inserirContato = db.prepare(`
    INSERT INTO contatos (nome, email, mensagem)
    VALUES (?, ?, ?)
`);

  const resultado = inserirContato.run(
    dados.nome.trim(),
    dados.email.trim(),
    dados.mensagem.trim(),
  );

  console.log("Contato salvo com ID:", resultado.lastInsertRowid);

  res.json({
    mensagem: "Mensagem enviada com sucesso!",
  });
}

function listarContatos(req, res) {
  const buscarContatos = db.prepare(`
    SELECT * FROM contatos
    ORDER BY id DESC
`);

  const contatos = buscarContatos.all();

  res.json(contatos);
}

function buscarContatoPorId(req, res) {
  const id = req.params.id;

  const buscarContato = db.prepare(`
        SELECT * FROM contatos
        WHERE id = ?
    `);

  const contato = buscarContato.get(id);

  if (!contato) {
    return res.status(404).json({
      mensagem: "Contato não encontrado.",
    });
  }

  res.json(contato);
}

function excluirContato(req, res) {
  const id = req.params.id;

  const excluir = db.prepare(`
        DELETE FROM contatos
        WHERE id = ?
    `);

  const resultado = excluir.run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      mensagem: "Contato não encontrado.",
    });
  }

  res.json({
    mensagem: "Contato excluído com sucesso.",
  });
}

function atualizarContato(req, res) {
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

  const atualizar = db.prepare(`
        UPDATE contatos
        SET nome = ?, email = ?, mensagem = ?
        WHERE id = ?
    `);

  const resultado = atualizar.run(
    dados.nome.trim(),
    dados.email.trim(),
    dados.mensagem.trim(),
    id,
  );

  if (resultado.changes === 0) {
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
