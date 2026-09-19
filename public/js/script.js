const formContato = document.querySelector("#formContato");

formContato.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const mensagem = document.querySelector("#mensagem").value;

  const mensagemConfirmacao = document.querySelector("#mensagemConfirmacao");

  fetch("http://localhost:3000/contato", {
    method: "POST",

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
      mensagemConfirmacao.textContent =
        dados.mensagem + " Obrigado pelo contato, " + nome + ".";

      formContato.reset();
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem:", erro);

      mensagemConfirmacao.textContent = erro.message;
    });
});
