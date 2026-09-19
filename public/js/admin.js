const listaContatos = document.querySelector("#listaContatos");

const areaEdicao = document.querySelector("#areaEdicao");
const formEditar = document.querySelector("#formEditar");
const editarId = document.querySelector("#editarId");
const editarNome = document.querySelector("#editarNome");
const editarEmail = document.querySelector("#editarEmail");
const editarMensagem = document.querySelector("#editarMensagem");
const botaoLogout = document.querySelector("#botaoLogout");

botaoLogout.addEventListener("click", function () {
  fetch("/auth/logout", {
    method: "POST",
  })
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Não foi possível realizar o logout.");
      }

      return resposta.json();
    })
    .then(() => {
      window.location.href = "/login.html";
    })
    .catch((erro) => {
      console.error("Erro ao realizar logout:", erro);
    });
});

formEditar.addEventListener("submit", function (event) {
  event.preventDefault();

  const id = editarId.value;
  const nome = editarNome.value;
  const email = editarEmail.value;
  const mensagem = editarMensagem.value;

  console.log("ID:", id);
  console.log("Nome:", nome);
  console.log("E-mail:", email);
  console.log("Mensagem:", mensagem);

  fetch(`/contato/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: nome,
      email: email,
      mensagem: mensagem,
    }),
  })
    .then((resposta) => {
      if (!resposta.ok) {
        return resposta.json().then((dados) => {
          throw new Error(dados.mensagem);
        });
      }

      return resposta.json();
    })
    .then((dados) => {
      console.log(dados);

      const botaoEditar = document.querySelector(
        `.botao-editar[data-id="${id}"]`,
      );

      const linha = botaoEditar.closest("tr");

      const celulas = linha.querySelectorAll("td");

      celulas[1].textContent = nome;
      celulas[2].textContent = email;
      celulas[3].textContent = mensagem;

      areaEdicao.style.display = "none";

      formEditar.reset();
    })
    .catch((erro) => {
      console.error("Erro ao atualizar contato:", erro);
    });
});

fetch("/contato")
  .then((resposta) => {
    if (!resposta.ok) {
      return resposta.json().then((dados) => {
        throw new Error(dados.mensagem);
      });
    }

    return resposta.json();
  })
  .then((contatos) => {
    contatos.forEach((contato) => {
      const linha = document.createElement("tr");

      const celulaId = document.createElement("td");
      celulaId.textContent = contato.id;

      const celulaNome = document.createElement("td");
      celulaNome.textContent = contato.nome;

      const celulaEmail = document.createElement("td");
      celulaEmail.textContent = contato.email;

      const celulaMensagem = document.createElement("td");
      celulaMensagem.textContent = contato.mensagem;

      const celulaData = document.createElement("td");
      celulaData.textContent = contato.criado_em;

      linha.appendChild(celulaId);
      linha.appendChild(celulaNome);
      linha.appendChild(celulaEmail);
      linha.appendChild(celulaMensagem);
      linha.appendChild(celulaData);

      const celulaAcoes = document.createElement("td");

      const botaoEditar = document.createElement("button");
      botaoEditar.textContent = "Editar";
      botaoEditar.classList.add("botao-editar");
      botaoEditar.dataset.id = contato.id;

      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "Excluir";
      botaoExcluir.classList.add("botao-excluir");
      botaoExcluir.dataset.id = contato.id;

      celulaAcoes.appendChild(botaoEditar);
      celulaAcoes.appendChild(botaoExcluir);

      linha.appendChild(celulaAcoes);

      listaContatos.appendChild(linha);

      botaoEditar.addEventListener("click", function () {
        const id = botaoEditar.dataset.id;

        fetch(`/contato/${id}`)
          .then((resposta) => resposta.json())
          .then((contato) => {
            editarId.value = contato.id;
            editarNome.value = contato.nome;
            editarEmail.value = contato.email;
            editarMensagem.value = contato.mensagem;

            areaEdicao.style.display = "block";
          })
          .catch((erro) => {
            console.error("Erro ao buscar contato:", erro);
          });
      });

      botaoExcluir.addEventListener("click", function () {
        const id = botaoExcluir.dataset.id;

        const confirmar = confirm(`Deseja realmente excluir o contato ${id}?`);

        if (!confirmar) {
          return;
        }

        fetch(`/contato/${id}`, {
          method: "DELETE",
        })
          .then((resposta) => {
            if (!resposta.ok) {
              return resposta.json().then((dados) => {
                throw new Error(dados.mensagem);
              });
            }

            return resposta.json();
          })
          .then((dados) => {
            console.log(dados);

            linha.remove();
          })
          .catch((erro) => {
            console.error("Erro ao excluir contato:", erro);
          });
      });
    });
  })
  .catch((erro) => {
    console.error("Erro ao buscar contatos:", erro);
  });
