require("dotenv").config();

const express = require("express");

const cors = require("cors");

const session = require("express-session");

const contatoRoutes = require("./routes/contatoRoutes");

const authRoutes = require("./routes/authRoutes");

const verificarAutenticacao = require("./middlewares/authMiddleware");

require("./database/database");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 60 * 1000
  }
}));

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

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
