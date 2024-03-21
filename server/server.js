const express = require("express");
const app = express("");
const mysql = require("mysql");
const cors = require("cors");

const Banco_De_Dados = mysql.createPool({
  host: "youtube.c7cca24a6tib.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "adiminadmin",
  database: "youtube_premium",
  insecureAuth: true,
});

app.use(
  cors({
    origin: ["https://ornelassignature.vercel.app"],
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.get("/", (Requisicao, Resposta) => {
  Resposta.send("Servidor rodando");
});

app.post("/registro", (Requisicao, Resposta) => {
  const { Nome, Numero, Email, Indicacao } = Requisicao.body;
  const Status_Assinatura = true;
  const Status_Pagamento = true;
  const Data_Assinatura = new Date();
  const Data_Vencimento = Data_Assinatura.setMonth(
    Data_Assinatura.getMonth() + 1
  );
  const Grupo_Assinantes = 1;

  console.log("Nome: " + Nome);
  console.log("Numero: " + Numero);
  console.log("Email: " + Email);
  console.log("Indicacao: " + Indicacao);
  console.log("Status_Assinatura: " + Status_Assinatura);
  console.log("Status_Pagamento: " + Status_Pagamento);
  console.log("Data_Assinatura: " + Data_Assinatura);
  console.log("Data_Vencimento: " + Data_Vencimento);
  console.log("Grupo_Assinantes: " + Grupo_Assinantes);

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
      "INSERT INTO assinantes ( nome, telefone, email, indicacao, status_assinatura, status_pagamento, data_assinatura, data_vencimento, grupo_assinantes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    let Valores_Para_Insercao = [
      Nome,
      Numero,
      Email,
      Indicacao,
      Status_Assinatura,
      Status_Pagamento,
      Data_Assinatura,
      Data_Assinatura,
      Grupo_Assinantes,
    ];

    console.log(
      "Valores que vão para o banco de dados: " + Valores_Para_Insercao
    );

    // if (Teste_Duplicidade === true) {
    //   console.log("Inserção de assinante");
    //   Banco_De_Dados.query(
    //     Sintaxe_SQL_Insercao,
    //     Valores_Para_Insercao,
    //     (erro, resultado) => {
    //       console.log(erro);
    //       console.log(resultado);
    //     }
    //   );
    // }
  }, 500);

  Resposta.send(console.log("Executado o servidor"));
});

app.get("/registro", (Requisicao, Resposta) => {
  Resposta.send("Registro Servidor");
});

app.listen(5000, () => console.log("Servidor na porta 5000"));
