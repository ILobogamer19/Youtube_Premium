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
  connectionTimeout: 30000,
  authSwitchHandler: (data, cb) => {
    if (data.pluginName === "mysql_clear_password") {
      const password = "adiminadmin";
      cb(null, Buffer.from(password + "\0"));
    }
  },
});

app.use(
  cors({
    origin: ["https://ornelassignature.vercel.app"],
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/teste-conexao", (req, res) => {
  Banco_De_Dados.getConnection((err, connection) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      res.status(500).send("Erro ao conectar ao banco de dados");
    } else {
      console.log("Conexão bem-sucedida ao banco de dados");
      connection.release();
      res.status(200).send("Conexão bem-sucedida ao banco de dados");
    }
  });
});

app.get("/", (Requisicao, Resposta) => {
  Resposta.send("Servidor rodando");
});

app.post("/registro", (Requisicao, Resposta) => {
  const { Nome, Numero, Email, Indicacao } = Requisicao.body;
  const Status_Assinatura = true;
  const Status_Pagamento = true;
  const Data_Assinatura = new Date();
  const Data_Vencimento = new Date(Data_Assinatura);
  const Grupo_Assinantes = 1;

  Data_Vencimento.setMonth(Data_Vencimento.getMonth() + 1);

  // const Data_Assinatura_Formatada = Data_Assinatura.toISOString().split("T")[0];
  // const Data_Vencimento_Formatada = Data_Vencimento.toISOString().split("T")[0];

  const Data_Assinatura_Formatada = "2024-03-04";
  const Data_Vencimento_Formatada = "2024-04-04";

  console.log("Nome: " + Nome);
  console.log("Numero: " + Numero);
  console.log("Email: " + Email);
  console.log("Indicacao: " + Indicacao);
  console.log("Status_Assinatura: " + Status_Assinatura);
  console.log("Status_Pagamento: " + Status_Pagamento);
  console.log("Data_Assinatura: " + Data_Assinatura_Formatada);
  console.log("Data_Vencimento: " + Data_Vencimento_Formatada);
  console.log("Grupo_Assinantes: " + Grupo_Assinantes);

  var Sintaxe_SQL_Pesquisa_Usuarios = "SELECT email FROM assinantes";
  var Emails_Registrados;
  var Teste_Duplicidade = true;

  // Banco_De_Dados.query(Sintaxe_SQL_Pesquisa_Usuarios, (erro, Resultado) => {
  //   console.log("Executado");
  //   return (Emails_Registrados = Resultado);
  // });

  setTimeout(() => {
    // console.log("Inicio de repetição de objeto");
    // if (Emails_Registrados) {
    //   Emails_Registrados.forEach((Objeto) => {
    //     console.log("Verificação de email repetido");
    //     if (Email == Objeto.email) {
    //       Teste_Duplicidade = false;
    //       console.log("Email repetido encontrado");
    //     }
    //   });
    // }

    var Sintaxe_SQL_Insercao =
      "INSERT INTO assinantes ( nome, telefone, email, indicacao, status_assinatura, status_pagamento, data_assinatura, data_vencimento, grupo_assinantes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    var Valores_Para_Insercao = [
      Nome,
      Numero,
      Email,
      Indicacao,
      Status_Assinatura,
      Status_Pagamento,
      Data_Assinatura_Formatada,
      Data_Vencimento_Formatada,
      Grupo_Assinantes,
    ];

    console.log(
      "Valores que vão para o banco de dados: " + Valores_Para_Insercao
    );

    if (Teste_Duplicidade === true) {
      console.log("Inserção de assinante");
      Banco_De_Dados.query(
        Sintaxe_SQL_Insercao,
        Valores_Para_Insercao,
        (erro, resultado) => {
          console.log("Query executada");
          console.log(erro);
          console.log(resultado);
        }
      );
    }
    Resposta.send("Envio de solicitações executado");
  }, 500);
});

app.listen(5000, () => console.log("Servidor na porta 5000"));
