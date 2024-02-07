import QR_Code_Pagamento from "../img/QR_Code_Pagamento.png";
import ButtonCopiarChavePix from "./Subcomponents_FormularioCadastro/ButtonCopiarChavePix";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function FormularioMercadoPago() {
  const [Nome, setNome] = useState("");
  const [Numero, setNumero] = useState("");
  const [Email, setEmail] = useState("");
  const [Codigo, setCodigo] = useState("");

  function Enviar_Informacoes_De_Contato(e) {
    e.preventDefault();

    if (Nome === "" || Numero === "" || Email === "") {
      alert("Campos faltando");
      return;
    }

    const Dados_Para_Email = {
      Nome,
      Numero,
      Email,
      Codigo,
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
          setNome("");
          setNumero("");
          setEmail("");
          setCodigo("");
        },
        (error) => {
          console.log("Erro: " + error);
        }
      );
  }

  return (
    <div>
      <h2 className="Titulo_Formulario_Cadastro">Informações para Contato:</h2>
      <form
        onSubmit={Enviar_Informacoes_De_Contato}
        className="Formulario_Cadastro_Form"
      >
        <div>
          <label className="Titulo_Cadastro_Informacoes">Nome:</label>
          <input
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            placeholder="José Pereira"
            className="Inputs_De_Cadastro"
            value={Nome}
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes">Número:</label>
          <input
            name="number"
            onChange={(e) => setNumero(e.target.value)}
            placeholder="15996344652"
            className="Inputs_De_Cadastro"
            value={Numero}
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes">E-mail:</label>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemailaqui@gmail.com"
            className="Inputs_De_Cadastro"
            value={Email}
            required
          />
        </div>
        <br />
        <div>
          <label className="Titulo_Cadastro_Informacoes">Código:</label>
          <input
            name="text"
            onChange={(e) => setCodigo(e.target.value)}
            className="Inputs_De_Cadastro"
            placeholder="Código de recomendação"
            value={Codigo}
          />
        </div>
        <div className="Botao_De_Cadastro">
          <button type="submit" className="Buttons_Cadastro_E_Pix">
            Cadastrar
          </button>
        </div>
      </form>
      <div className="Pagamentos_Pix">
        <div className="Conjunto_Pagamento_QR_Code">
          <p>QR Code</p>
          <img src={QR_Code_Pagamento} className="QR_Code_Pagamento" />
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
