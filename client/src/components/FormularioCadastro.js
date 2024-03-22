import QR_Code_Pagamento from "../img/QR_Code_Pagamento.png";
import ButtonCopiarChavePix from "./Subcomponents_FormularioCadastro/ButtonCopiarChavePix";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Axios from "axios";

export default function FormularioMercadoPago() {
  function Enviar_Informacoes_De_Contato() {
    if (Valores.Nome === "" || Valores.Numero === "" || Valores.Email === "") {
      alert("Campos faltando");
      return;
    }

    const Dados_Para_Email = {
      Nome: Valores.Nome,
      Numero: Valores.Numero,
      Email: Valores.Email,
      Indicacao: Valores.Indicacao,
    };

    emailjs
      .send(
        "service_kyocec9",
        "template_cdf98xv",
        Dados_Para_Email,
        "sonbgxXbzWTEhu-xj"
      )
      .then(
        () => {
          alert("Informações Enviadas");
        },
        (error) => {
          console.log("Erro: " + error);
        }
      );
  }

  const [Valores, setValores] = useState();

  function Adicao_De_Valores_Formato_Json(Valor) {
    setValores((Valores_Anteriores) => ({
      ...Valores_Anteriores,
      [Valor.target.name]: Valor.target.value,
    }));
  }

  function Obter_Valores_Ao_Clicar_No_Botao() {
    Enviar_Informacoes_De_Contato();
    if (!Valores.Indicacao) {
      Valores.Indicacao = "";
    }

    console.log("Enviando Dados para Axios");
    console.log(Valores.Nome);

    Axios.post(
      "https://ornelassignature-server.vercel.app/registro",
      {
        Nome: Valores.Nome,
        Numero: Valores.Numero,
        Email: Valores.Email,
        Indicacao: Valores.Indicacao,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resposta) => {
        console.log("Resultado do envio:");
        console.log(resposta);
      })
      .catch((erro) => {
        console.log("Erro: ");
        console.log(erro);
      });
    console.log("Dados enviados");
  }

  return (
    <div>
      <h2 className="Titulo_Formulario_Cadastro">Informações para Contato:</h2>
      <div className="Formulario_Cadastro_Form">
        <div>
          <label className="Titulo_Cadastro_Informacoes">Nome:</label>
          <input
            name="Nome"
            onChange={Adicao_De_Valores_Formato_Json}
            placeholder="Seu nome"
            className="Inputs_De_Cadastro Input_Nome_Cadastro"
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes">Telefone:</label>
          <input
            name="Numero"
            onChange={Adicao_De_Valores_Formato_Json}
            placeholder="Seu telefone"
            className="Inputs_De_Cadastro Telefone_Nome_Cadastro"
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes ">E-mail:</label>
          <input
            name="Email"
            onChange={Adicao_De_Valores_Formato_Json}
            placeholder="seuemailaqui@gmail.com"
            className="Inputs_De_Cadastro Email_Nome_Cadastro"
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes ">Código:</label>
          <input
            name="Indicacao"
            onChange={Adicao_De_Valores_Formato_Json}
            className="Inputs_De_Cadastro Codigo_Nome_Cadastro"
            placeholder="Código de recomendação"
          />
        </div>
        <div className="Botao_De_Cadastro">
          <button
            onClick={Obter_Valores_Ao_Clicar_No_Botao}
            className="Buttons_Cadastro_E_Pix"
          >
            Cadastrar
          </button>
        </div>
      </div>
      <div className="Pagamentos_Pix">
        <div className="Conjunto_Pagamento_QR_Code">
          <p>QR Code</p>
          <img src={QR_Code_Pagamento} className="QR_Code_Pagamento" alt="" />
        </div>
        <div className="Conjunto_Pagamento_Chave_Pix">
          <ButtonCopiarChavePix
            Chave_Pix={
              "00020101021126930014br.gov.bcb.pix01360052b4fc-d447-4c59-a0f0-db734933ae150231Youtube Premium e YouTube Music520400005303986540515.005802BR5918MANUEL G DE O NETO6008RIVERSUL62070503***630448F3"
            }
          />
          <p className="Chave_Pix">
            00020101021126930014
            <br />
            br.gov.bcb.pix01360052b4
            <br />
            fc-d447-4c59-a0f0-db734933ae150231
            <br />
            Youtube Premium e YouTube Music520400005303986540515.
            <br />
            005802BR5918MANUEL G DE O NETO6008RIVERSUL
            <br />
            62070503***630448F3
          </p>
        </div>
      </div>
    </div>
  );
}
