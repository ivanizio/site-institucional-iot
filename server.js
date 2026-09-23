require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
});

const express = require("express");

const session = require("express-session");

const helmet = require("helmet");

const contatoRoutes = require("./routes/contatoRoutes");

const authRoutes = require("./routes/authRoutes");

const tratarErros = require("./middlewares/errorMiddleware");

const verificarAutenticacao = require("./middlewares/authMiddleware");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    },
  }),
);

app.use(express.static(__dirname + "/public"));

app.get("/admin", (req, res) => {
  if (!req.session.autenticado) {
    return res.redirect("/login.html");
  }

  res.sendFile(__dirname + "/private/admin.html");
});

app.use("/contato", contatoRoutes);

app.use("/auth", authRoutes);

const PORTA = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.get("/teste", (req, res) => {
  res.send("Rota de teste funcionando com Express!");
});

app.use(tratarErros);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
