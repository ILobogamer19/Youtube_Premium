const express = require("express");
const app = express("");
const mysql = require("mysql");
const cors = require("cors");

const Banco_De_Dados = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "devmanuel2006",
  database: "youtube_premium",
  insecureAuth: true,
});

app.use(cors());
app.use(express.json());
app.use("/", (Requisicao, Resposta) => {
  Resposta.send("Servidor rodando");
});

app.post("/registro", (Requisicao, Resposta) => {
  const { Nome } = Requisicao.body;
  const { Numero } = Requisicao.body;
  const { Email } = Requisicao.body;
  const { Indicacao } = Requisicao.body;

  console.log("Nome: " + Nome);

  let Sintaxe_SQL_Pesquisa_Usuarios = "SELECT email FROM assinantes";
  let Emails_Registrados;
  let Teste_Duplicidade = true;

  Banco_De_Dados.query(Sintaxe_SQL_Pesquisa_Usuarios, (erro, Resultado) => {
    console.log("Executado");
    return (Emails_Registrados = Resultado);
  });

  setTimeout(() => {
    console.log("Inicio de repetição de objeto");
    Emails_Registrados.forEach((Objeto) => {
      console.log("Verificação de email repetido");
      if (Email == Objeto.email) {
        Teste_Duplicidade = false;
        console.log("Email repetido encontrado");
      }
    });

    let Sintaxe_SQL_Insercao =
      "INSERT INTO assinantes ( nome, numero, email, indicacao) VALUES (?, ?, ?, ?)";

    let Valores_Para_Insercao = [Nome, Numero, Email, Indicacao];

    if (Teste_Duplicidade === true) {
      console.log("Inserção de assinante");
      Banco_De_Dados.query(
        Sintaxe_SQL_Insercao,
        Valores_Para_Insercao,
        (erro, resultado) => {
          console.log(erro);
          console.log(resultado);
        }
      );
    }
  }, 500);

  Resposta.send("Registro");
});

app.listen(5000, () => console.log("Servidor na porta 5000"));
