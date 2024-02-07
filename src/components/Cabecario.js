import Icon_Youtube from "../img/Icon_Youtube.png";
import { useNavigate } from "react-router-dom";

export default function Cabecario() {
  const url = useNavigate();

  const Url_Assinatura = () => {
    url("/Assinatura");
  };

  return (
    <>
      <div className="Cabecario_Visivel">
        <img
          src={Icon_Youtube}
          className="Icon_Youtube"
          onClick={() => {
            window.location.href = "https://www.youtube.com/";
          }}
          alt=""
        />
        <button className="Button_Assine_Agora">ASSINE AQUIIIIII AGORA</button>
      </div>
      <div className="Cabecario">
        <img
          src={Icon_Youtube}
          className="Icon_Youtube"
          onClick={() => {
            window.location.href = "https://www.youtube.com/";
          }}
          alt=""
        />
        <button className="Button_Assine_Agora" onClick={Url_Assinatura}>
          ASSINE AGORA
        </button>
      </div>
    </>
  );
}
