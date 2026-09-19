const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = document.querySelector("#usuario").value;
  const senha = document.querySelector("#senha").value;
  const mensagemLogin = document.querySelector("#mensagemLogin");

  fetch("/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      usuario: usuario,
      senha: senha,
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
      mensagemLogin.textContent = dados.mensagem;
      window.location.href = "/admin";
    })
    .catch((erro) => {
      mensagemLogin.textContent = erro.message;
    });
});
